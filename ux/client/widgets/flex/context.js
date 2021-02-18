// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'


// the default context value
const flexContext = {
    // the container direction
    isRow: true,
    isReversed: false,

    // we disable flex after the first time the user interacts with the panel separators
    isDeflexed: false,
}


// setup the flex context
const Context = React.createContext(flexContext)


// export default Context
export { Context.Provider, useFlexDirection,


// end of file
