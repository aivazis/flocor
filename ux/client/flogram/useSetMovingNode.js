// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
// context
import { Context } from './context'


// callback factory that binds the moving node mutator to a given node
export const useSetMovingNode = (node) => {
    // grab the new node mutator
    const { setMovingNode } = React.useContext(Context)

    // make a callback that will attach the given node
    const register = () => {
        // register the new node
        setMovingNode(node)
        // all done
        return
    }

    return register
}


// end of file
