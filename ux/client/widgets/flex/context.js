// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'


// setup the flex context
const Context = React.createContext(
    // the default value that consumers see when accessing the context outside a provider
    {
        // the container direction
        direction: "row",
        isRow: true,
        isReversed: false,
    }
)


// the provider factory
const Provider = ({
    // the box orientation
    direction,
    // children
    children
}) => {
    // deduce the main axis
    const isRow = direction.startsWith("row")
    // and the order, which affects the correlation between mouse movement and extent update
    const isReversed = direction.endsWith("-reverse")

    // build the current value of the context
    const context = {
        // direction
        direction,
        isRow,
        isReversed,

        // empty panels array
        panels: [],
    }

    // build the context and make it available
    return (
        <Context.Provider value={context} >
            {children}
        </Context.Provider >

    )
}


// access the flexbox direction
const useDirection = () => {
    // pull the value from the context
    const { direction, isRow, isReversed } = React.useContext(Context)
    // and make it available
    return { direction, isRow, isReversed }
}


// publish
export {
    // the context and its provider factory
    Context, Provider,
    // hooks
    useDirection
}


// end of file
