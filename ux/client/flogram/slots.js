// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useFragment } from 'react-relay/hooks'
// local
import { Slot } from './slot'


// render the flow nodes that are products
export const Slots = ({ flow }) => {
    // extract the list of products
    const { slots } = useFragment(slotsFragment, flow)
    // render
    return (
        <>
            {
                slots.edges.map(edge => (
                    <Slot key={edge.node.id} slot={edge.node} />
                ))
            }
        </>
    )
}


//  the query fragment that fetches products
const slotsFragment = graphql`
    fragment slots_flow on Flow {
        slots(first: 10000) @connection(key: "slotsFragment_slots") {
            edges {
                node {
                    id
                    # the slot
                    ...slot_slot
                }
                cursor
            }
        }
    }
`

// end of file