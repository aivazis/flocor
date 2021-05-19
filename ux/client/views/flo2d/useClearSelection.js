// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
// context
import { Context } from './context'


// callback factory that clears the selection
export const useClearSelection = () => {
    // grab the selection setter
    const { setSelection } = React.useContext(Context)
    // make a callback that clear the selection
    const clearSelection = () => { setSelection([]) }
    // and return it
    return clearSelection
}


// end of file
