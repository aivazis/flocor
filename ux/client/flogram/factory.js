// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useFragment } from 'react-relay/hooks'
// project
// shapes
import { Factory as Shape, Plex, Terminal } from '~/shapes'
// local
import { Node } from './node'


// render the flow nodes that are factories
export const Factory = (props) => {
    const factory = useFragment(graphql`
        fragment factory_factory on Factory {
            id
            inputs
            outputs
            position {
                x
                y
            }
        }
    `, props.factory)

    // make a narrow factory, i.e. one where the connector lines terminate on the base cell
    const cell = 1
    // input terminal
    const inplex = (
        <g transform={`translate(${-cell} 0)`}>
            {factory.inputs ? <Plex /> : <Terminal />}
        </g>
    )
    // output terminal
    const outplex = (
        <g transform={`translate(${cell} 0)`}>
            {factory.outputs ? <Plex /> : <Terminal />}
        </g>
    )

    // render
    return (
        <Node id={factory.id} position={factory.position} >
            <Shape />
            {inplex}
            {outplex}
        </Node>
    )
}


// end of file