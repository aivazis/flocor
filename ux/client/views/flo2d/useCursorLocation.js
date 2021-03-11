// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
// context
import { Context } from './context'


// register a component to display at the current mouse coordinates while the user
// is dragging a flow node form the tray onto the canvas
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
