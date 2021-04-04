// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'


// the error message that consumers see when accessing the context outside a provider
const complaint = "while accessing the 'flogram' context: no provider"
// setup the flex context
export const Context = React.createContext(
    // the default value that consumers see when accessing the context outside a provider
    {
        // the moving node candidate
        movingNode: null,
        // a callback to mark a new node as the moving candidate
        setMovingNode: () => { throw new Error(complaint)},
    }
)


// the provider factory
export const Provider = ({ children }) => {
    // non-null indicates that a node was clicked and is a candidate for moving
    const [movingNode, setMovingNode] = React.useState(null)

    // build the current value of the context
    const context = {
        // moving node management
        movingNode, setMovingNode,
    }

    // provide for my children
    return (
        <Context.Provider value={context} >
            {children}
        </Context.Provider >
    )
}


// end of file
