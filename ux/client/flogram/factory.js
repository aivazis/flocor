// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
import { Factory as FactoryShape, Plex, Terminal } from '~/shapes'

// render the shape
export const Factory = ({ inputs = [], outputs = [], style }) => {
    // short or long?
    const cell = 2

    // input multiplexing
    const inplex = (
        <g transform={`translate(${-cell} 0)`}>
            {inputs.length ? <Plex /> : <Terminal />}
        </g>
    )
    // output multiplexing
    const outplex = (
        <g transform={`translate(${cell} 0)`}>
            {outputs.length ? <Plex /> : <Terminal />}
        </g>
    )

    // paint me; don't forget we are using a quarter cell grid,
    // i.e.a diagram cell is four grid cells
    return (
        <>
            <FactoryShape cell={cell} />
            {inplex}
            {outplex}
        </>
    )
}


// end of file
