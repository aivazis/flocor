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
    // grab the new node mutator
    const { setNewNode } = React.useContext(Context)

    // make a callback that will clear the registered new node
    const cancel = () => {
        // register the new node
        setNewNode(null)
        // all done
        return
    }

    return cancel
}


// end of file
