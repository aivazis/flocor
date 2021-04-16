// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
// context
import { Context } from './context'


// callback factory that binds the new node mutator to a given node
export const useInteractionContainer = () => {
    // grab the registered node from the context
    const { containerRef } = React.useContext(Context)
    // and make it available
    return containerRef
}


// end of file
