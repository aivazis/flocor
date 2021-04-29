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
    const { movingNode, setMovingNode } = React.useContext(Context)

    // make a callback that will clear the registered moving node
    const cancel = () => {
        // if we don't have a node marked as a moving candidate
        if (movingNode === null) {
            // bail
            return
        }
        // otherwise, clear the moving node marker
        setMovingNode(null)
        // all done
        return
    }

    // publish the callback
    return cancel
}


// end of file
