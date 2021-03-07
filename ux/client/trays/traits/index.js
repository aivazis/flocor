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


// a tray with a flow node
const tray = () => {

    // paint me
    return (
        <Tray title="pyre traits">
            <Node family="str" />
            <Node family="int" />
            <Node family="float" />
        </Tray >
    )
}


// publish
export default tray


// end of file
