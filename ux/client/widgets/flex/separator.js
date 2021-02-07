// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React  from 'react'


// the separator inserted between consecutive items in a flex panel
const separator = ({idx, style, controls}) => {
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
            handle.style.backgroundColor = style.colors.visible
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
            handle.style.backgroundColor = style.colors.hidden
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
        <div style={style.rule} >
            <div ref={ref} style={style.handle} {...handleControls} />
        </div>
    )
}


// publish
export default separator


// end of file
