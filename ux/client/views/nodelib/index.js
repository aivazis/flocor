// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
import { Traits, Calc } from '~/trays'
// styles
import styles from './styles'


// the area
export const NodeLibrary = ({ style }) => {
    // pick a length scale; this is the pixel size of a grid cell and it sets the dimensions
    // of tray items
    const els = 10

    // mix my paint
    const boxStyle = { ...styles.box, ...style?.box }

    // paint me
    return (
        <section style={boxStyle}>
            <Traits els={els} />
            <Calc els={els} />
        </section>
    )
}


// end of file
