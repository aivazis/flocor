// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useFragment } from 'react-relay/hooks'
// project
import { Factory as Shape } from '~/shapes'
// local
import { Node } from './node'


// render the flow nodes that are factories
export const Factory = (props) => {
    const factory = useFragment(graphql`
        fragment factory_factory on Factory {
            id
            position {
                x
                y
            }
        }
    `, props.factory)

    // render
    return (
        <Node id={factory.id} position={factory.position} >
            <Shape />
        </Node>
    )
}


// end of file