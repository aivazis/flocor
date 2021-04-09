// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
import styles from './styles'

// render the shape
export const Terminal = ({ style }) => {
    // mix my paint
    const ico = { ...styles.icon, ...style?.icon }
    const deco = { ...styles.decoration, ...style?.decoration }

    // paint me
    return (
        <>
            <circle style={deco} cx="0" cy="0" r="0.5" />
            <path style={ico} d="M -0.25 -0.25 L 0.25 0.25 M -0.25 0.25 L 0.25 -0.25" />
        </>
    )
}


// end of file
