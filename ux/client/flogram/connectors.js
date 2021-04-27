// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useFragment } from 'react-relay/hooks'
// local
import { Connector } from './connector'


// render the flow nodes that are connectors
export const Connectors = ({ flow }) => {
    // extract the list of connectors
    const { connectors } = useFragment(connectorsFragment, flow)
    // render
    return (
        <>
            {
                connectors.edges.map(edge => (
                    <Connector key={edge.node.id} connector={edge.node} />
                ))
            }
        </>
    )
}


//  the query fragment that fetches connectors
const connectorsFragment = graphql`
    fragment connectors_flow on Flow {
        connectors(first: 10000) @connection(key: "connectorsFragment_connectors") {
            edges {
                node {
                    id
                    ...connector_connector
                }
                cursor
            }
        }
    }
`

// end of file