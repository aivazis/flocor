// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
import { Tray, Node } from '~/trays'
// styles
import styles from './styles'


// the area
const nodelib = ({ style }) => {
    // mix my paint
    const boxStyle = { ...styles.box, ...style?.box }

    // paint me
    return (
        <section style={boxStyle}>
            <Tray title="pyre traits" >
                <Node family="str" />
                <Node family="int" />
                <Node family="float" />
            </Tray>
            <Tray title="application variables" >
                <Node family="str" />
                <Node family="int" />
                <Node family="float" />
            </Tray>
        </section>
    )
}


// publish
export default nodelib


// end of file
