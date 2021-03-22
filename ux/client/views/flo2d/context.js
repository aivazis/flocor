// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'


// setup the flex context
export const Context = React.createContext(
    // the default value that consumers see when accessing the context outside a provider
    {
        // NYI: add a default object here once the context structure settles
    }
)


// the provider factory
export const Provider = ({ children }) => {
    // non-null indicates that we are adding a node to the flow
    const [newNode, setNewNode] = React.useState(null)

    // build the current value of the context
    const context = {
        // new node management
        newNode, setNewNode,
    }

    // provide for my children
    return (
        <Context.Provider value={context} >
            {children}
        </Context.Provider >

    )
}


// end of file
