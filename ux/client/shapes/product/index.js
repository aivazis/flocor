// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
import styles from './styles'


// render the shape
export const Product = ({ style }) => {
    // mix my paint
    const ico = { ...styles.icon, ...style?.icon }

    // paint me; don't forget we are using a quarter cell grid,
    // i.e.a diagram cell is four grid cells
    return (
        <circle cx="0" cy="0" r=".5" style={ico} />
    )
}


// end of file
