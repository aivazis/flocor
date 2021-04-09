// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
import styles from './styles'


// parts
const diamond = "M -0.125 0 L 0 0.125 L 0.125 0 L 0 -0.125 Z"


// render the shape
export const Factory = ({ inputs, outputs, style }) => {
    // mix my paint
    const ico = { ...styles.icon, ...style?.icon }
    const deco = { ...styles.decoration, ...style?.decoration }

    // paint me; don't forget we are using a quarter cell grid,
    // i.e.a diagram cell is four grid cells
    return (
        <>
            <line style={deco} x1="-2" y1="0" x2="2" y2="0" />
            <line style={deco} x1="0" y1="0" x2="0" y2="-2" />
            <rect style={ico} x="-2.0125" y="-0.125" width="0.25" height="0.25" />
            <rect style={ico} x="2.0125" y="-0.125" width="0.25" height="0.25" />
            <path style={ico} d={diamond} />
            <circle style={ico} cx="0" cy="-2" r=".5" />
        </>
    )
}


// end of file
