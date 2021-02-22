// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React  from 'react'

// locals
// hooks
import { useEvent } from '~/hooks'
// my parts
import { Provider, useDirection } from './context'
import Panel from './panel'
import Separator from './separator'
// styles
import styles from './styles'


const Flex = ({hints=[], style, children, debug}) => {
    // get the flexbox direction and parity
    const { direction, isRow, isReversed } = useDirection()

    // mix my paint
    // for the container
    const boxStyle = {...styles.box, ...style?.box, flexDirection: direction}
    // and individual panels
    const panelStyle = {...styles.panel, ...style?.panel}

    // if i have no children
    if (children === undefined) {
        // make an empty container
        return ( <div style={boxStyle} />)
    }

    // if i only have one child
    if (React.Children.count(children) == 1) {
        // get the size hints
        const hint = hints[0] ?? [0, Infinity]
        // no interactivity is necessary; just render the box, for the styling side effects,
        // and the single child wrapped in a {panel}, again for the styling side effects
        return (
            <div style={boxStyle}>
                <Panel idx={0}
                       hint={hint}
                       style={panelStyle} debug={debug} >
                    {children}
                </Panel>
            </div>
        )
    }

    // the box extent we manipulate is determined by the direction
    const dim = isRow ? "width" : "height"

    // build and install the support for the resizing behavior
    // keep track of the active separator
    const activeSeparator = React.useRef(inactiveSeparator)
    // make a flag that indicates whether we have turned flexing off; this happens the first
    // time the end-user clicks on a separator, indicating that she wants control over the
    // panel sizes
    let isUnflexed = false

    // resizing starts when a separator is clicked
    // save the separator id and the coordinates of the mouse
    const start = ({separator, x, y}) => {
        // save the event data
        activeSeparator.current = {separator, x, y}

        // if this is not the first time a separator get clicked
        if (isUnflexed) {
            // nothing further to do
            return
        }
        // otherwise, set the indicator
        isUnflexed = true
        // and shut {flex} down for all panels except the last one, which is expected to be
        // and to absorb the viewport resizing
        refs.forEach((ref, idx) => {
            // get the associated node
            const node = ref.current
            // get its extent
            const extent = Math.floor(node.getBoundingClientRect()[dim])
            // transfer it to the style
            node.style[dim] = `${extent}px`
            // deduce the correct flex: every panel is now frozen to it styled extent, except
            // the last one that absorbs viewport size changes
            const flx = (idx == refs.length-1) ? "1 1 0" : "0 0 auto"
            // style the node
            node.style.flex = flx
            // all done
            return
        })

        // all done
        return
    }

    // resizing ends under a variety of conditions, such as the mouse being released
    const end = () => {
        // upack the current state
        const { separator, x, y } = activeSeparator.current

        // if we have an active separator
        if (separator !== null) {
            // and reset the saved state
            activeSeparator.current = inactiveSeparator
        }

        // all done
        return
    }

    // resizing happens as the mouse moves
    const drag = (evt) => {
        // N.B.: do not be tempted to {end()} the interaction when the extent leaves the
        // interval supplied by the client; since the mouse will continue to be held down
        // while the user crosses the lines, calling {end} switches the browser to the
        // default drag behavior, which is almost certainly selecting content from the
        // panels; this doesn't look good...

        // let the browser know that this event is handled here
        evt.stopPropagation()
        // and should have no side effects
        evt.preventDefault()

        // unpack the current state
        const { separator, x, y } = activeSeparator.current
        // if we don't have an active separator
        if (separator === null) {
            // bail
            return
        }

        // convert the separator index into a panel id
        const panel = separator
        // the transaction parity determines whether positive displacements enlarge or shrink
        // the panel; it provides support for the "-reversed" variants of {flex-direction}, and
        // soon for {rtl} documents, once i understand that a bit better
        const parity = isReversed ? -1 : 1

        // extract the new mouse coordinates
        const { clientX, clientY } = evt
        // compute the proposed size change
        let delta = parity * (isRow ? (clientX - x) : (clientY - y))
        // if we are sliding along the cross axis
        if (delta == 0) {
            // nothing further to do
            return
        }

        // cap the proposed size change to what i can accommodate
        const allowed = allowable(panel, dim, delta)
        // if no change is permitted
        if (allowed == 0) {
            // nothing further to do
            return
        }

        // make a pile to keep the proposed updates
        const updates = new Array()
        // and add me to it
        updates.push([panel, allowed])

        // the size change remaining to absorb is the opposite
        let remaining = - allowed
        // go through the panels that follow me; at least one is guaranteed to exist
        // since the last panel doesn't have an associated separator
        for (let pid = panel+1; pid < refs.length; ++pid) {
            // compute how much this one can absorb
            const absorbed = allowable(pid, dim, remaining)
            // if it can participate
            if (absorbed != 0) {
                // add it to the pile
                updates.push([pid, absorbed])
            }
            // update what's left
            remaining -= absorbed
        }

        // if we failed to absorb the entire proposed change
        if (remaining != 0) {
            // don't change anything; there is no acceptable solution
            return
        }

        // otherwise, update the extents
        resize(updates, dim)

        // build the new state
        const updatedState = { separator, x: clientX, y: clientY }
        // and attach it
        activeSeparator.current = updatedState

        // all done
        return
    }

    // compute how much of a proposed extent change can be accommodated by a given panel
    const allowable = (panel, dim, proposal) => {
        // if there is no proposed change
        if (proposal == 0) {
            // short circuit the logic to avoid measuring the panel
            return 0
        }
        // get the panel node
        const node = refs[panel].current
        // compute its relevant extent
        const extent = node.getBoundingClientRect()[dim]
        // unpack the size hints
        const [min, max] = hints[panel] ?? [0, Infinity]

        // in order to compute the change that can be accommodated
        const allowed = Math.round(
            // figure out which way we plan to change the extent
            (proposal > 0)
            // on strech: no more than {maxSize} permits
            ? Math.min(proposal, max - extent)
            // on shrink: no less that {minSize} permits
            : Math.max(proposal, min - extent))

        // pass it on
        return allowed
    }

    // adjust the extents of all panels that can participate in a resize
    const resize = (updates, dim) => {
        // go through all updates
        updates.forEach(update => {
            // unpack the instructions
            const [panel, delta] = update
            // get the node
            const node = refs[panel].current
            // compute the new extent
            const extent = node.getBoundingClientRect()[dim] + delta
            // and use it to style the node
            node.style[dim] = `${extent}px`
            // all done
            return
        })
    }

    // make a ref for the container
    const boxRef = React.useRef()
    // install our event listeners
    useEvent({name: "mouseleave", handler: end, client: boxRef})
    useEvent({name: "mousemove", handler: drag, client: boxRef})
    useEvent({name: "mouseup", handler: end, client: boxRef})

    // set aside storage for my content
    const contents = new Array()
    // and for the refs to my panels
    const refs = new Array()

    // assemble the separator controls
    const separatorControls = {
        start
    }

    // go through my children
    children.forEach((child, idx) => {
        // everybody, except the zeroth panel
        if (idx !== 0) {
            // is preceded by a separator
            const sep = (<Separator key={`sep.${idx-1}`} idx={idx-1}
                                    isRow={isRow} isReversed={isReversed}
                                    style={style?.separator} controls={separatorControls}
                                    debug={debug}
                         />)
            // add it to the pile
            contents.push(sep)
        }

        // make a ref for this panel
        const ref = React.useRef()
        // add it to the pile
        refs.push(ref)

        // carefully get the associated size hint
        let hint = hints[idx] ?? [0, Infinity]
        // every child is placed in a panel
        const panel = (
            <Panel ref={ref} key={`panel.${idx}`} idx={idx}
                   hint={hint}
                   style={panelStyle} debug={debug} >
                {child}
            </Panel>
        )
        // add it to the pile
        contents.push(panel)
    })

    // paint me
    return (
        <div ref={boxRef} style={boxStyle}>
            {contents}
        </div >
    )
}


// the inactive separator
const inactiveSeparator = {
    separator: null,
    x: 0,
    y: 0,
}


// turn flex into a context provider and publish
export default ({direction, ...rest}) => {
    // set up the context provider
    return (
        <Provider direction={direction} >
            <Flex {...rest} />
        </Provider >
    )
}


// end of file
