// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useFragment } from 'react-relay/hooks'
// project
import { Slot as Shape } from '~/shapes'
// local
import { Node } from './node'


// render the flow nodes that are products
export const Slot = (props) => {
    const slot = useFragment(graphql`
        fragment slot_slot on Slot {
            id
            position {
                x
                y
            }
        }
    `, props.slot)

    // render
    return (
        <Node id={slot.id} position={slot.position} >
            <Shape />
        </Node>
    )
}


// end of file