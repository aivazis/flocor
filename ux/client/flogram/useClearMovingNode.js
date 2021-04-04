// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
// context
import { Context } from './context'


// callback factory that clears the moving node state
export const useClearMovingNode = () => {
    // grab the new node mutator
    const { setMovingNode } = React.useContext(Context)

    // make a callback that will clear the registered moving node
    const cancel = () => {
        // register the new node
        setMovingNode(null)
        // all done
        return
    }

    return cancel
}


// end of file
