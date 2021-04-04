// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'


// the error message that consumers see when accessing the context outside a provider
const complaint = "while accessing the 'shadow' context: no provider"
// setup the shadow context
export const Context = React.createContext(
    // the default value that consumers see when accessing the context outside a provider
    {
        // for the sprite
        shadow: null,
        setShadow: () => { throw new Error(complaint) },
        // and its location
        offset: { x: 0, y: 0 },
        setOffset: () => { throw new Error(complaint) }
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
