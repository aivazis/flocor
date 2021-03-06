// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'

// locals
// shapes
import { Product } from '~/shapes'
// styles
import styles from './styles'


// a tray with a single flow node
const node = ({ family, shape, size = 24, style }) => {
    // my current state
    const [state, setState] = React.useState("normal")

    // to turn highlighting on
    const highlightOn = () => setState("highlighted")
    // to turn highlighting off
    const highlightOff = () => setState("normal")
    // box controls
    const boxControls = {
        onMouseEnter: highlightOn,
        onMouseLeave: highlightOff,
    }

    // mix my paint
    const familyStyle = { ...styles.family, ...style?.family }
    const shapeStyle = { ...styles.shape, ...style?.shape }
    const nodeStyle = { ...styles.node, ...style?.node }
    const stateStyle = { ...styles.state[state], ...style?.state[state] }
    const boxStyle = { ...styles.box, ...style?.box, ...stateStyle }

    // resize the shape; my shapes are all drawn in a (1k, 1k) box
    const shrink = `scale(${size / 1000})`

    // paint me
    return (
        <div style={boxStyle} {...boxControls}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                width={size} height={size} style={nodeStyle}>
                <g transform={shrink}>
                    <Product style={shapeStyle} />
                </g>
            </svg>

            <span>&nbsp;:&nbsp;</span>

            <span style={familyStyle}>
                {family}
            </span>
        </div>
    )
}


// publish
export default node


// end of file
