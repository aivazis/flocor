// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'

// project
// hooks
import { useSetNewNode } from '~/views/flo2d'
import { useAttachShadow } from '~/widgets/shadow'
// locals
// styles
import styles from './styles'


// a tray with a single flow node
export const Node = ({ category, family, shape, size, style }) => {
    // make a callback that sets the cursor shadow when initiating node drag; clearing
    // the shadow is done by my parent when the mouse is released anywhere in its client area,
    // including within me
    const attachShadow = useAttachShadow(shape, { x: -size.x, y: -size.y })
    // the other thing that has to happen when i get clicked is to register the type of node
    // i generate
    const registerNode = useSetNewNode({ category, family })
    // assemble the selection callback
    const select = () => {
        // register the node info
        registerNode()
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
            {shape}
            <span>&nbsp;:&nbsp;</span>
            <span style={familyStyle}>{family}</span>
        </div>
    )
}


// end of file
