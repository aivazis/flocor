// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// project
// shapes
import { Product } from '~/shapes'
// local
// styling
import styles from './styles'

// render the shape
export const Shape = ({ style }) => {
    // mix my paint
    const shapeStyle = { ...styles.shape, ...style?.shape }
    // paint me
    return (
        <Product style={shapeStyle} />
    )
}


// end of file
