// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'


// render the flow nodes that are macros
export const Node = ({ position, children }) => {
    // unpack the position of the node
    const { x, y } = position
    // build the positioning transform
    const xform = `translate(${x} ${y})`
    // render
    return (
        <g transform={xform} >
            {children}
        </g>
    )
}


// end of file