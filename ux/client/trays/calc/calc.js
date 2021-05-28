// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'

// local
// the tray with the {calc} variables
import { Variables } from './variables'
// the tray with the {calc} operators
import { Operators } from './operators'

// the trays with nodes from the {calc} package
export const Calc = ({ els, style }) => {

    // paint me
    return (
        <>
            <Variables els={els} style={style} />
            <Operators els={els} style={style} />
        </>
    )
}



// end of file
