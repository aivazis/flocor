// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'


// the error message that consumers see when accessing the context outside a provider
const complaint = "while accessing the 'flo2d' context: no provider"
// setup the flex context
export const Context = React.createContext(
    // the default value that consumers see when accessing the context outside a provider
    {
        // a ref to the interaction container
        containerRef: null,
    }
)


// the provider factory
export const Provider = ({ children }) => {
    // make a ref
    const containerRef = React.useRef()

    // build the current value of the context
    const context = {
        // the interaction container
        containerRef,
    }

    // provide for my children
    return (
        <Context.Provider value={context} >
            {children}
        </Context.Provider >
    )
}


// end of file
