// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useFragment } from 'react-relay/hooks'
// local
import { Macro } from './macro'


// render the flow nodes that are macros
export const Macros = ({ flow }) => {
    // extract the list of macros
    const { macros } = useFragment(macrosFragment, flow)
    // render
    return (
        <>
            {
                macros.edges.map(edge => (
                    <Macro key={edge.node.id} macro={edge.node} />
                ))
            }
        </>
    )
}


//  the query fragment that fetches macros
const macrosFragment = graphql`
    fragment macros_flow on Flow {
        macros(first: 10000) @connection(key: "macrosFragment_macros") {
            edges {
                node {
                    id
                    name
                    family
                    position {
                        x
                        y
                    }
                }
                cursor
            }
        }
    }
`

// end of file