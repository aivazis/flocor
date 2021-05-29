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
import { Calc, ISCE } from '~/trays'
// locals
// styles
import styles from './styles'
import { useClearNewNode } from '~/views/flo2d'


// the trays
export const NodeLibrary = ({ style }) => {
    // grab the app interaction element
    const appContainerRef = useInteractionContainer()
    // and the callback that clears the new node info
    const clearNewNode = useClearNewNode()

    // pick a length scale; this is the pixel size of a grid cell and it sets the dimensions
    // of tray items
    const els = 10

    // set up my event handlers
    const controls = {
        onMouseUp: clearNewNode,
    }

    // mix my paint
    const boxStyle = { ...styles.box, ...style?.box }
    // and paint me
    return (
        <section style={boxStyle} {...controls}>
            <Shadow ref={appContainerRef} >
                <ISCE els={els} />
                <Calc els={els} />
            </Shadow>
        </section>
    )
}


// end of file
