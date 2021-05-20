// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useFragment } from 'react-relay/hooks'
// project
import { Slot as Unbound } from '~/shapes'
import { Product as Bound } from '~/shapes'
import { useSelection } from '~/views/flo2d'
// local
import { Node } from './node'


// render the flow nodes that are bound/unbound slots
export const Slot = (props) => {
    // unpack the slot info
    const slot = useFragment(graphql`
        fragment slot_slot on Slot {
            id
            bound
            position {
                x
                y
            }
        }
    `, props.slot)

    // get the current selection
    const { selection } = useSelection()
    // am i selected
    const selected = selection.includes(slot.id)

    // render
    return (
        <Node id={slot.id} position={slot.position} >
            {slot.bound ? <Bound highlight={selected} /> : <Unbound highlight={selected} />}
        </Node>
    )
}


// end of file