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
    // the component to render at the mouse coordinates when dragging flow nodes
    // from { nodelib } to the { canvas }
    const [shadow, setShadow] = React.useState(null)
    // and its offset relative to the cursor position
    const [offset, setOffset] = React.useState({ x: 0, y: 0 })

    // build the current value of the context
    const context = {
        // shadow
        shadow, setShadow,
        // and its offset
        offset, setOffset,
    }

    // provide for my children
    return (
        <Context.Provider value={context} >
            {children}
        </Context.Provider >

    )
}


// end of file
