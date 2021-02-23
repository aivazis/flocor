// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'


// setup the flex context
export const Context = React.createContext(
    // the default value that consumers see when accessing the context outside a provider
    {
        // directional flags
        direction: "row",
        isRow: true,
        parity: 1,
        // direction dependent attributes
        mainExtent: "width",
        crossExtent: "height",
        minExtent: "minWidth",
        maxExtent: "maxWidth",
        // cursors
        cursor: "col-resize",
        // the transform that centers the separator handle in its parent space
        transform: "translate(-50%, 0%)",
        // panel management
        panels: null,
        addPanel: () => { throw new Error('no context provider') },
        // the flexing panel when a separator gets activated
        flexingPanel: null,
        setFlexingPanel: () => { throw new Error('no context provider') },
        // the set of panels downstream from the flexing one
        downstreamPanels: null,
        setDownstreamPanels: () => { throw new Error('no context provider') },
    }
)


// the provider factory
export const Provider = ({
    // the box orientation
    direction,
    // children
    children
}) => {
    // deduce the main axis
    const isRow = direction.startsWith("row")
    // and the order, which affects the correlation between mouse movement and extent update
    const parity = direction.endsWith("-reverse") ? -1 : 1

    // direction dependent styling attributes
    const [mainExtent, crossExtent] = isRow ? ["width", "height"] : ["height", "width"]
    const [minExtent, maxExtent] = isRow ? ["minWidth", "maxWidth"] : ["minHeight", "maxHeight"]
    const cursor = isRow ? "col-resize" : "row-resize"
    const transform = isRow ? "translate(-50%, 0)" : "translate(0, -50%)"

    // the registered panels
    const [panels, setPanels] = React.useState(new Map())

    // indicator of whether we have taken control of the panel extents
    const [isManaged, setIsManaged] = React.useState(false)
    // the location of the mouse as a separator is being dragged
    const [separatorLocation, setSeparatorLocation] = React.useState(null)
    // the panel being flexed when a separator is activated
    const [flexingPanel, setFlexingPanel] = React.useState(null)
    // the panels that are candidates for absorbing the flexing
    const [downstreamPanels, setDownstreamPanels] = React.useState([])

    // higher level functions
    // registering a new panel
    const addPanel = ({ ref, min, max }) => {
        // update the panel pile
        setPanels(old => new Map([...old, [ref, [min, max]]]))
        // all done
        return
    }

    // build the current value of the context
    const context = {
        // direction flags
        direction, isRow, parity,
        // direction dependent styling attribute names
        mainExtent, crossExtent, minExtent, maxExtent,
        // cursors
        cursor,
        // the transform that centers the separator handle within the rule
        transform,
        // panel management
        panels, addPanel,
        // managed panels have extents under our control after the first resize
        isManaged, setIsManaged,
        // support for flexing
        flexingPanel, setFlexingPanel,
        separatorLocation, setSeparatorLocation,
        downstreamPanels, setDownstreamPanels,
    }

    // provide for my children
    return (
        <Context.Provider value={context} >
            {children}
        </Context.Provider >

    )
}


// register a panel
export const useRegisterPanel = (ref, min, max) => {
    // grab the state mutator
    const {
        mainExtent,
        panels, addPanel,
        isManaged, setIsManaged,
        setSeparatorLocation,
        setFlexingPanel,
        setDownstreamPanels,
    } = React.useContext(Context)

    // when a panel starts flexing
    const beginFlex = (location) => {
        // get the panel refs
        const refs = Array.from(panels.keys())
        // find the index of the active panel
        const idx = refs.indexOf(ref)
        // use it to extract all the downstream panels
        const downstream = refs.slice(idx + 1)

        // currently, disallow activity on the last separator; so skip the state update
        // if there are no downstream panels
        if (downstream !== []) {
            // record the panel that is flexing
            setFlexingPanel(ref)
            // and the downstream ones
            setDownstreamPanels(downstream)
            // save the current mouse coordinates
            setSeparatorLocation(location)
        }

        // if this is the first time we are flexing
        if (!isManaged) {
            // go through all the panels
            refs.forEach((panelRef, idx) => {
                // get the associated container
                const node = panelRef.current
                // measure it
                const extent = Math.round(node.getBoundingClientRect()[mainExtent])
                // transfer its current extent to the its style
                node.style[mainExtent] = `${extent}px`
                // deduce the correct flex: every panel is now frozen to its styled extent,
                // except the last one that becomes responsible for absorbing viewport size changes
                const flx = (idx == refs.length - 1) ? "1 1 0" : "0 0 auto"
                // and apply it
                node.style.flex = flx
                // all done
                return
            })
            // mark
            setIsManaged(true)
        }

        // all done
        return
    }

    // after the initial mount
    React.useEffect(() => {
        // register the panel
        addPanel({ ref, min, max })
    }, [])

    // build and return the context relevant to this panel
    return {
        panel: ref,
        // begin a panel resize sequence
        beginFlex
    }
}


export const useFlex = () => {
    // grab the state mutator
    const {
        // directional
        isRow, parity, mainExtent,
        // the registered panels
        panels,
        // flexing support
        flexingPanel, setFlexingPanel,
        downstreamPanels, setDownstreamPanels,
        separatorLocation, setSeparatorLocation,
    } = React.useContext(Context)

    // when flexing ends
    const endFlex = () => {
        // reset the flexing panel
        setFlexingPanel(null)
        // and the pile of downstream panels
        setDownstreamPanels([])
        // all done
        return
    }

    // while we are flexing
    const doFlex = ({ x, y }) => {
        // if no panel is flexing
        if (flexingPanel == null) {
            // nothing to do
            return
        }

        // unpack the location of the last update
        const { x: oldX, y: oldY } = separatorLocation
        // compute the proposed size change
        const delta = parity * (isRow ? (x - oldX) : (y - oldY))
        // if we are just sliding along the cross axis
        if (Math.abs(delta) < 1) {
            // don't go any further
            return
        }

        // cap the proposed {delta} to what the flexing panel can accommodate
        const allowed = clip(flexingPanel, delta)
        // if no change is permitted
        if (allowed == 0) {
            // nothing further to do
            return
        }

        // otherwise, let's batch the size changes into a transaction that we can abort
        // if we can't find a resizing solution
        const updates = new Array()
        // the first candidate is the flexing panel itself
        updates.push([flexingPanel, allowed])

        // keep track of how much change must be accommodated
        let remaining = - allowed
        // go through the panels downstream from the flexing one
        for (const panel of downstreamPanels) {
            // compute how much this one can absorb
            const absorbed = clip(panel, remaining)
            // if it can participate
            if (absorbed != 0) {
                // add it to the resining transaction
                updates.push([panel, absorbed])
            }
            // update the remaining size change and move on to the next downstream panel
            remaining -= absorbed
        }

        // if we failed to absorb everything
        if (Math.trunc(remaining) != 0) {
            // punt; the proposed size change cannot be accommodated
            return
        }
        // otherwise, update the sizes of every panel that flexes
        resize(updates)

        // record the new state
        setSeparatorLocation({ x, y })

        // all done
        return
    }

    // clip the proposed extent change to the user supplied range
    const clip = (panel, delta) => {
        // get the panel node
        const node = panel.current
        // compute its extents
        const extent = node.getBoundingClientRect()[mainExtent]
        // unpack the size hints that were registered for this panel
        const [min, max] = panels.get(panel)
        // in order to do the clipping
        const allowed = Math.trunc(
            // first figure out which way we plan to push the limits
            (delta > 0)
                // on stretch : no more than {maxSize} permits
                ? Math.min(delta, max - extent)
                // on shrink: no less that {minSize} permit
                : Math.max(delta, min - extent))
        // all done
        return allowed
    }

    // update the extents of the panels in given a batch of size changes
    const resize = (updates) => {
        // go through the updates
        for (const [panel, delta] of updates) {
            // get the node
            const node = panel.current
            // compute the new extent
            const extent = node.getBoundingClientRect()[mainExtent] + delta
            // and use it to style the node
            node.style[mainExtent] = `${extent}px`
        }
        // all done
        return
    }

    // build and return the context relevant to this panel
    return {
        // provide access to the current flexing panel
        flexingPanel,
        // the location of the separator
        separatorLocation,
        // compute a resize solution
        doFlex,
        // end a panel resize sequence
        endFlex,
        //
    }
}


// end of file
