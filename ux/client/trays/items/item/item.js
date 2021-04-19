// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'

// project
// hooks
import { useAttachShadow } from '~/widgets/shadow'
// locals
// styles
import styles from './styles'


// a tray item
// it renders the graphic representation in {children}, followed by a {label}
// the selector is a function that registers a diagram mutator whenever i get clicked
export const Item = ({ family, selector, els, size, style, children }) => {
    // make a callback that sets the cursor shadow when initiating node drag; clearing
    // the shadow is done by my parent when the mouse is released anywhere in its client area,
    // including within me
    const attachShadow = useAttachShadow(children, { x: -els * size.x, y: -els * size.y })
    // assemble the selection callback
    const select = () => {
        // invoke the selector
        selector?.()
        // attach the cursor shadow
        attachShadow()
        // all done
        return
    }

    // my current state: normal, selected, highlighted
    const [state, setState] = React.useState("normal")
    // to turn highlighting on
    const highlightOn = () => setState("highlighted")
    // to turn highlighting off
    const highlightOff = () => setState("normal")

    // box controls
    const boxControls = {
        onMouseDown: select,
        onMouseEnter: highlightOn,
        onMouseLeave: highlightOff,
    }

    // mix my paint
    const familyStyle = { ...styles.family, ...style?.family }
    const stateStyle = { ...styles.state[state], ...style?.state[state] }
    const boxStyle = { ...styles.box, ...style?.box, ...stateStyle }

    // paint me
    return (
        <div style={boxStyle} {...boxControls}>
            {children}
            <span style={familyStyle}>&nbsp;:&nbsp;{family}</span>
        </div>
    )
}


// end of file
