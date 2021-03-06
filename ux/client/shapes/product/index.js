// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
import styles from './styles'


// render the shape
const shape = ({ style }) => {
    // mix my paint
    const ico = { ...styles.icon, ...style?.icon }

    // paint me
    return (
        <circle cx="500" cy="500" r="300"
            style={ico} />
    )
}


// publish
export default shape


// end of file