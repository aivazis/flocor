// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
// context
import { Context } from './context'


// hook that provides a callback to store the cursor location in {context}
export default () => {
    // grab the shadow mutator
    const { cursorLocation, setCursorLocation } = React.useContext(Context)

    // when a flow node is selected
    const trackCursorLocation = (evt) => {
        // make a location
        const location = { x: evt.clientX, y: evt.clientY }
        // set the cursor location
        setCursorLocation(location)
        // all done
        return
    }

    // all done
    return { cursorLocation, trackCursorLocation }
}


// end of file
