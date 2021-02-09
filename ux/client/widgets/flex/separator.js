// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React  from 'react'

// locals
// styles
import styles from './styles'

// the separator inserted between consecutive items in a flex panel
const separator = ({idx, direction, style, controls}) => {
    // direction dependent settings
    let dirRuleStyle = {}
    let dirHandleStyle = {}

    // configure a vertical separator
    if (direction.startsWith("row")) {
        // for the rule
        dirRuleStyle = {
            width: "1px",
            cursor: "col-resize",
        }
        // for the handle
        dirHandleStyle = {
            width: "9px",
            height: "100%",
            transform: "translate(-50%, 0)",
        }
    // configure a horizontal separator
    } else if (direction.startsWith("column")) {
        // for the rule
        dirRuleStyle = {
            height: "1px",
            cursor: "row-resize",
        }
        // for the handle
        dirHandleStyle = {
            width: "100%",
            height: "9px",
            transform: "translate(0, -50%)",
        }
    // anything else
    } else {
        // nothing to do but complain
        throw `direction should be one of [row|column], not '${direction}'`
    }

    // mix my paint
    const ruleStyle = { ...styles.separator.rule, ...dirRuleStyle, ...style?.rule }
    // the paint of my handle
    const handleStyle = { ...styles.separator.handle, ...dirHandleStyle, ...style?.handle }
    // and the state dependent coloring
    const stateStyle = { ...styles.separator.colors, ...style?.colors }

    // make a ref for the handle
    const ref = React.useRef(null)

    // when the mouse enters my space
    const onMouseEnter = (evt) => {
        // stop this event from bubbling up
        evt.stopPropagation()
        // get the handle
        const handle = ref.current
        // if the handle has rendered
        if (handle) {
            // paint it
            handle.style.backgroundColor = stateStyle.visible
        }
        // all done
        return
    }

    // when the mouse leaves my space
    const onMouseLeave = (evt) => {
        // stop this event from bubbling up
        evt.stopPropagation()
        // get the handle
        const handle = ref.current
        // if the handle has rendered
        if (handle) {
            // paint it
            handle.style.backgroundColor = stateStyle.hidden
        }
        // all done
        return
    }

    // on click
    const onMouseDown = (evt) => {
        // stop this event from bubbling up
        evt.stopPropagation()
        // let the flex wrapper know that i was clicked
        controls?.start?.({separator: idx, x: evt.clientX, y: evt.clientY})
        // all done
        return
    }

    // assemble the handle controls
    const handleControls = {
        onMouseEnter,
        onMouseLeave,
        onMouseDown,
    }

    // paint me
    return (
        <div style={ruleStyle} >
            <div ref={ref} style={handleStyle} {...handleControls} />
        </div>
    )
}


// publish
export default separator


// end of file
