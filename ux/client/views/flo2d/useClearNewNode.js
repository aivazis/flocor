// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
// context
import { Context } from './context'


// callback factory that clears the new node state
export const useClearNewNode = () => {
    // grab the handler that resets the new node information
    const { clearNewNode } = React.useContext(Context)
    // and return it
    return clearNewNode
}


// end of file
