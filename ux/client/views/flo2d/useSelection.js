// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
// context
import { Context } from './context'


// grant access to the pile of selected nodes
export const useSelection = () => {
    // grab the relevant part of the context
    const { selection, setSelection } = React.useContext(Context)
    // and make it available
    return { selection, setSelection }
}


// end of file
