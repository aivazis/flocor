// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
// context
import { Context } from './context'


// access to the cursor shadow, a decoration that reminds the user of what they are dragging
export const useShadow = () => {
    // grab the shadow and its offset
    const { shadow, offset } = React.useContext(Context)
    // and make them available
    return { shadow, offset }
}


// end of file
