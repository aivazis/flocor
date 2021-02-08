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
    // if i have no children
    if (children === undefined) {
        // there's nothing to do
        return null
    }

    // if i only have one child
    if (!Array.isArray(children)) {
        // nothing to do
        return children
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

    // a ref for the wrapper
    const wrapperRef = React.useRef()
    // install our event listeners on the wrapper
    useEvent({name: "mouseleave", handler: end, client: wrapperRef})
    useEvent({name: "mousemove", handler: drag, client: wrapperRef})
    useEvent({name: "mouseup", handler: end, client: wrapperRef})

    // storaget for my content
    const contents = new Array()
    // and the refs to my panels
    const refs = new Array()

    // go through my children
    children.forEach((child, idx) => {
        // make a ref for this panel
        const ref = React.useRef()
        // add it to the pile
        refs.push(ref)
        // every child is placed in a panel
        const panel = (
            <Panel ref={ref} key={`panel.${idx}`} idx={idx} style={style?.panel} >
                {child}
            </Panel>
        )
        // add it to the pile
        contents.push(panel)

        // everybody is followed by a separator
        const sep = (<Separator key={`sep.${idx}`} idx={idx} direction={direction}
                               style={style?.separator} controls={separatorControls} />)
        // add it to the pile
        contents.push(sep)
    })

    // mix my paint
    const boxStyle = {...styles.box, ...style.box, flexDirection: direction}
    // paint me
    return (
        <div ref={wrapperRef} style={boxStyle}>
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
