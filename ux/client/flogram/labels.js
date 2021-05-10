// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useFragment } from 'react-relay/hooks'
// local
import { Label } from './label'


// render the flow nodes that are labels
export const Labels = ({ flow }) => {
    // extract the list of labels
    const { labels } = useFragment(labelsFragment, flow)
    // render
    return (
        <>
            {
                labels.edges.map(edge => (
                    <Label key={edge.node.id} label={edge.node} />
                ))
            }
        </>
    )
}


//  the query fragment that fetches labels
const labelsFragment = graphql`
    fragment labels_flow on Flow {
        labels(first: 10000) @connection(key: "labelsFragment_labels") {
            edges {
                node {
                    id
                    ...label_label
                }
                cursor
            }
        }
    }
`

// end of file