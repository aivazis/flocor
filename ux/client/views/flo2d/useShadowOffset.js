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
export default ({ offset }) => {
    // grab the shadow offset and its mutator
    const { shadowOffset, setShadowOffset } = React.useContext(Context)

    // make a callback that sets a new offset
    const attachShadowOffset = () => {
        // update the offset
        setShadowOffset(offset)
        // all done
        return
    }

    // and make them available
    return { shadowOffset, attachShadowOffset }
}


// end of file
