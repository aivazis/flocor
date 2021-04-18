// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// project
// shapes
import { Factory, Plex, Slot, Terminal } from '~/shapes'
// local
// styling
import styles from './styles'

// render the shape
export const Shape = ({ factory, style }) => {
    // unpack the factory metadata
    const { inputs, outputs } = factory
    // get the number of inputs
    const nInputs = inputs.length
    // and the number of outputs
    const nOutputs = outputs.length

    // make a narrow factory, i.e. one where the binding lines terminate on the base cell
    const cell = 1
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

    // mix my paint
    const shapeStyle = { ...styles.shape, ...style?.shape }
    const bindingsStyle = { ...styles.bindings, ...style?.bindings }

    // paint me
    return (
        <>
            {inputs.map((slot, idx) => {
                // the x coordinate of the slot
                const x = -(cell + 2)
                // and the y coordinate
                const y = 2 * idx + 1 - nInputs
                // render
                return (
                    <g key={slot.name} >
                        <path d={`M ${x} ${y} L ${x + 1} ${y} L -1 0`} style={bindingsStyle} />
                        <g transform={`translate(${x} ${y})`}>
                            <Slot />
                        </g>
                    </g>
                )
            })}
            {outputs.map((slot, idx) => {
                // the x coordinate of the slot
                const x = cell + 2
                // and the y coordinate
                const y = 2 * idx + 1 - nOutputs
                // render
                return (
                    <g key={slot.name} >
                        <path d={`M ${x} ${y} L ${x - 1} ${y} L 1 0`} style={bindingsStyle} />
                        <g transform={`translate(${x} ${y})`}>
                            <Slot />
                        </g>
                    </g>
                )
            })}
            <Factory cell={cell} style={shapeStyle} />
            {inplex}
            {outplex}
        </>
    )
}


// end of file
