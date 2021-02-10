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
import Panel from './panel'
import Separator from './separator'
// styles
import styles from './styles'


const flex = ({direction, style, children}) => {
    // mix my paint
    const boxStyle = {...styles.box, ...style?.box, flexDirection: direction}
    const panelStyle = {...styles.panel, ...style?.panel}

    // if i have no children
    if (children === undefined) {
        // make an empty container
        return ( <div style={boxStyle} />)
    }

    // a ref for the wrapper
    const boxRef = React.useRef()

    // if i only have one child
    if (!Array.isArray(children)) {
        // no interactivity is necessary; just render the box, for the styling side effects,
        // and the single child wrapped in a {panel}, again for the styling side effects
        return (
            <div ref={boxRef} style={boxStyle}>
                <Panel idx="0" style={panelStyle} >
                    {children}
                </Panel>
            </div>
        )
    }

    // deduce the direction
    const isRow = direction.startsWith("row")

    // build and install the upport for the resizing behavior
    // keep track of the active separator
    const activeSeparator = React.useRef(inactiveSeparator)

    // resizing starts when a separator is clicked
    // save the separator id and the coordinates of the mouse
    const start = ({separator, x, y}) => {
        // save the event data
        activeSeparator.current = {separator, x, y}
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
        // upack the current state
        const { separator, x, y } = activeSeparator.current
        // if we don't have an active separator
        if (separator === null) {
            // bail
            return
        }

        // this event is handled here
        evt.stopPropagation()
        // and should have no side effects
        evt.preventDefault()

        // grab the panel node
        const node = refs[separator].current
        // get its extent
        const { height, width } = node.getBoundingClientRect()

        // extract the new locations
        const { clientX, clientY } = evt

        // compute the displacement since the last update
        const delta = { dx: clientX - x, dy: clientY - y }

        // resize the panel
        node.style.flex = `0 0 auto`
        // on horizontal layouts
        if (isRow) {
            // adjust the width
            node.style.width = `${Math.max(width + delta.dx, 0)}px`
        // on vertical layouts
        } else {
            // adjust the height
            node.style.height = `${Math.max(height + delta.dy, 0)}px`
        }

        // build the new state
        const updatedState = { separator, x: clientX, y: clientY }
        // and attach it
        activeSeparator.current = updatedState
        // all done
        return
    }

    // assemble the separator controls
    const separatorControls = {
        start
    }

    // install our event listeners on the wrapper
    useEvent({name: "mouseleave", handler: end, client: boxRef})
    useEvent({name: "mousemove", handler: drag, client: boxRef})
    useEvent({name: "mouseup", handler: end, client: boxRef})

    // storaget for my content
    const contents = new Array()
    // and the refs to my panels
    const refs = new Array()

    // go through my children
    children.forEach((child, idx) => {
        // everybody, except the zeroth panel
        if (idx !== 0) {
            // is preceded by a separator
            const sep = (<Separator key={`sep.${idx-1}`} idx={idx-1} direction={direction}
                                    style={style?.separator} controls={separatorControls} />)
            // add it to the pile
            contents.push(sep)
        }

        // make a ref for this panel
        const ref = React.useRef()
        // add it to the pile
        refs.push(ref)
        // every child is placed in a panel
        const panel = (
            <Panel ref={ref} key={`panel.${idx}`} idx={idx}
                   direction={direction}
                   style={panelStyle} >
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


// the null active separator
const inactiveSeparator = {
    separator: null,
    x: 0,
    y: 0,
}


// publish
export default flex


// end of file
