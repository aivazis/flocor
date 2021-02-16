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
    const deco = { ...styles.decoration, ...style?.decoration }

    // paint me
    return (
        <>
            <path style={deco}
                  d="M 255 200 L 400 200 L 600 500" />
            <path style={deco}
                  d="M 255 800 L 400 800 L 600 500" />
            <path style={deco}
                  d="M 600 500 L 800 500" />

            <circle style={ico}
                    cx="150" cy="200" r="100" />
            <circle style={ico}
                    cx="900" cy="500" r="100" />
            <circle style={ico}
                    cx="150" cy="800" r="100" />
        </>
    )
}


// publish
export default shape


// end of file
