// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// project
import { Shadow } from '~/widgets'
// locals
// context
import { Provider } from './context'
// trays
import { Traits, Calc } from '~/trays'
// styles
import styles from './styles'


// the trays
const Trays = ({ style }) => {
    // pick a length scale; this is the pixel size of a grid cell and it sets the dimensions
    // of tray items
    const els = 10

    // make a ref for my cursor shadow
    const ref = React.useRef(null)

    // mix my paint
    const boxStyle = { ...styles.box, ...style?.box }

    // paint me
    return (
        <section style={boxStyle}>
            <Shadow ref={ref} >
                <Traits els={els} />
                <Calc els={els} />
            </Shadow>
        </section>
    )
}


// convert the tray section into a context provider
export const NodeLibrary = () => {
    // set up the context provider
    return (
        <Provider>
            <Trays />
        </Provider>
    )
}

// end of file
