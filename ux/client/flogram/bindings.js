// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useFragment } from 'react-relay/hooks'
// local
import { Binding } from './binding'


// render the flow nodes that are bindings
export const Bindings = ({ flow }) => {
    // extract the list of bindings
    const { bindings } = useFragment(bindingsFragment, flow)
    // render
    return (
        <>
            {
                bindings.edges.map(edge => (
                    <Binding key={edge.node.id} binding={edge.node} />
                ))
            }
        </>
    )
}


//  the query fragment that fetches bindings
const bindingsFragment = graphql`
    fragment bindings_flow on Flow {
        bindings(first: 10000) @connection(key: "bindingsFragment_bindings") {
            edges {
                node {
                    id
                    ...binding_binding
                }
                cursor
            }
        }
    }
`

// end of file