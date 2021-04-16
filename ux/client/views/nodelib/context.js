// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'


// the error message that consumers see when accessing the context outside a provider
const complaint = "while accessing the 'nodelib' context: no provider"
// setup the flex context
export const Context = React.createContext(
    // the default value that consumers see when accessing the context outside a provider
    {
        // information about the node we are constructing
        newNode: null,
        // a callback to attach new node information to the context
        setNewNode: () => { throw new Error(complaint) }
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
