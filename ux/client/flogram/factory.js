// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// project
// shapes
import { Factory as FactoryShape, Plex, Slot, Terminal } from '~/shapes'
// local
// styling
import styles from './styles'

// render the shape
export const Factory = ({ inputs = [], outputs = [], style }) => {
    // make a narrow factory
    const cell = 1
    // get the number of inputs
    const nInputs = inputs.length
    // and the number of outputs
    const nOutputs = outputs.length

    // input multiplexing
    const inplex = (
        <g transform={`translate(${-cell} 0)`}>
            {nInputs ? <Plex /> : <Terminal />}
        </g>
    )
    // output multiplexing
    const outplex = (
        <g transform={`translate(${cell} 0)`}>
            {nOutputs ? <Plex /> : <Terminal />}
        </g>
    )



    // paint me
    return (
        <>
            {inputs.map((product, idx) => {
                // the x coordinate of the slot
                const x = -(cell + 2)
                // and the y coordinate
                const y = 2 * idx + 1 - nInputs
                // render
                return (
                    <g key={product.label} >
                        <path d={`M ${x} ${y} L ${x + 1} ${y} L -1 0`} style={styles.binding} />
                        <g transform={`translate(${x} ${y})`}>
                            <Slot />
                        </g>
                    </g>
                )
            })}
            {outputs.map((product, idx) => {
                // the x coordinate of the slot
                const x = cell + 2
                // and the y coordinate
                const y = 2 * idx + 1 - nOutputs
                // render
                return (
                    <g key={product.label} >
                        <path d={`M ${x} ${y} L ${x - 1} ${y} L 1 0`} style={styles.binding} />
                        <g transform={`translate(${x} ${y})`}>
                            <Slot />
                        </g>
                    </g>
                )
            })}
            <FactoryShape cell={cell} />
            {inplex}
            {outplex}
        </>
    )
}


// end of file
