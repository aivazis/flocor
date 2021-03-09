// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
// context
import { Context } from './context'


// support for terminating a flex
export default () => {
    // flexing support
    const { flexingPanel, setFlexingPanel, setDownstreamPanels } = React.useContext(Context)

    // when flexing ends
    const endFlex = (evt) => {
        // if no panel is flexing
        if (flexingPanel == null) {
            // nothing to do
            return
        }

        // stop this event from bubbling up
        evt.stopPropagation()
        // and quash any side effects
        evt.preventDefault()

        // reset the flexing panel
        setFlexingPanel(null)
        // and the pile of downstream panels
        setDownstreamPanels([])

        // all done
        return
    }

    // build and return the context relevant to this panel
    return {
        // end a panel resize sequence
        endFlex
    }
}


// end of file
