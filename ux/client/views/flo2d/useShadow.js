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
export default ({ shape }) => {
    // grab the shadow and its mutator
    const { shadow, setShadow } = React.useContext(Context)

    // when a flow node is selected
    const attachShadow = () => {
        // set the shadow
        setShadow(shape)
        // all done
        return
    }

    // all done
    return { shadow, attachShadow }
}


// end of file
