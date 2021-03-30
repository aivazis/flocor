// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'


// render the flow nodes that are macros
export const Globals = () => {
    // set up some global definitions
    return (
        <defs>
            <radialGradient id="gridGlow">
                <stop offset="0%" stopColor="hsl(0deg,0%,30%)" />
                <stop offset="20%" stopColor="hsl(0deg,0%,30%)" />
                <stop offset="100%" stopColor="hsl(0deg,0%,0%)" />
            </radialGradient>
        </defs>
    )
}


// end of file