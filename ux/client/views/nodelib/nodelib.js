// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// project
// hooks
import { useInteractionContainer } from '~/views/flo2d'
// widgets
import { Shadow } from '~/widgets'
// trays
import { Traits, Calc } from '~/trays'
// locals
// context
import { Provider } from './context'
// styles
import styles from './styles'


// the trays
const Trays = ({ style }) => {
    // grab the app interaction element
    const appContainerRef = useInteractionContainer()

    // pick a length scale; this is the pixel size of a grid cell and it sets the dimensions
    // of tray items
    const els = 10

    // mix my paint
    const boxStyle = { ...styles.box, ...style?.box }

    // paint me
    return (
        <section style={boxStyle}>
            <Shadow ref={appContainerRef} >
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
        <Provider >
            <Trays />
        </Provider>
    )
}


// end of file
