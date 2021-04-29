// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { useMutation } from 'react-relay/hooks'
// locals
// context
import { Context } from './context'

// the last step in moving a flow node is sending a mutation to the server
// this hook reads the node information that was left behind in the {flogram} context when
// the dragging operation started and uses it to build a callback that commits the mutation
export const useNodeEndMove = (flow) => {
    // grab the moving node state and its mutator
    const { movingNode, setMovingNode } = React.useContext(Context)
    // the mutation sends the new location information to the server
    const [commitMoveNode, isInFlight] = useMutation(moveNodeMutation)

    // validate the last position of a moving node
    const endMoveNode = (position) => {
        // check whether there is a moving node marker
        if (movingNode === null) {
            // and bail if not
            return
        }
        // otherwise, assemble the node info and commit the change
        commitMoveNode({
            variables: {
                info: {
                    // the flow that owns the moving node
                    flow,
                    // the moving node
                    id: movingNode,
                    // the final position
                    ...position
                }
            },
            updater: (store) => {
                // get the result payload
                const result = store.getRootField("moveNodeEnd")
                // if we don't have one yet
                if (!result) {
                    // bail
                    return
                }
                // get the flow id
                const owner = result.getValue("flow")
                console.log(flow)
                // all done
                return
            }
        })

        // clear the moving node marker
        setMovingNode(null)

        // all done
        return
    }

    // build the container and return it
    return { movingNode, endMoveNode }
}


// the mutation that adds a new node to the diagram
const moveNodeMutation = graphql`mutation useNodeEndMoveMutation($info: MoveNodeInput!) {
    moveNodeEnd(nodeinfo: $info) {
        # the id of the flow that owns the moving node
        flow
        # refresh the info of the moving node
        node {
            # based on its id
            id
            # update its position
            position {
                x
                y
            }
        }
        # the dead node
        dead {
            id
        }
        # the connectors
        connectors {
            ...connector_connector
        }
        # updated connectivity information
        # new connectors
        new {
            ...connector_connector
        }
        # connectors to remove
        discard {
            ...connector_connector
        }
    }
}`


// end of file
