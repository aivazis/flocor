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
export default (shape = null) => {
    // grab the shadow and its mutator
    const { shadow, setShadow } = React.useContext(Context)

    // when it's time to attach the shadow
    const attachShadow = () => {
        // install the shadow
        setShadow(shape)
        // all done
        return
    }

    // all done
    return { shadow, attachShadow }
}


// end of file
