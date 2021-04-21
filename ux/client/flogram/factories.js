// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useFragment } from 'react-relay/hooks'
// local
import { Factory } from './factory'


// render the flow nodes that are products
export const Factories = ({ flow }) => {
    // extract the list of products
    const { factories } = useFragment(factoriesFragment, flow)
    // render
    return (
        <>
            {
                factories.edges.map(edge => (
                    <Factory key={edge.node.id} factory={edge.node} />
                ))
            }
        </>
    )
}


//  the query fragment that fetches products
const factoriesFragment = graphql`
    fragment factories_flow on Flow {
        factories(first: 10000) @connection(key: "factoriesFragment_factories") {
            edges {
                node {
                    id
                    ...factory_factory
                }
                cursor
            }
        }
    }
`

// end of file