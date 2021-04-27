// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import { useMutation } from 'react-relay/hooks'

// project
// hooks
import { useMovingNode } from './useMovingNode'


// the last step in moving a flow node is sending a mutation to the server
// this hook reads the node information that was left behind in the {flogram} context when
// the dragging operation started and uses it to build a callback that commits the mutation
export const useNodeMove = () => {
    // clicking on a node registers it as a move candidate with the {flogram} context
    const movingNodeInfo = useMovingNode()
    // the mutation sends the new location information to the server
    const [commitMoveNode, isInFlight] = useMutation(moveNodeMutation)

    // to create a new node
    const moveNode = (position) => {
        // check whether there is a moving node marker
        if (movingNodeInfo === null) {
            // and bail if not
            return
        }

        // otherwise, assemble the node info and commit the change
        commitMoveNode({
            variables: {
                info: {
                    // type info
                    id: movingNodeInfo,
                    // the new position
                    ...position
                }
            },
            updater: (store) => {
                // get the result payload
                const result = store.getRootField("moveNode")
                // if we don't have one yet
                if (!result) {
                    // bail
                    return
                }

                console.log("node moved...")

                // all done
                return
            }
        })

        // all done
        return
    }

    // build the container and return it
    return { moveNode, movingNodeInfo }
}


// the mutation that adds a new node to the diagram
const moveNodeMutation = graphql`mutation useNodeMoveMutation($info: MoveNodeInput!) {
    moveNode(nodeinfo: $info) {
        #  refresh the info of the moving node
        node {
            # based on its id
            id
            # update its position
            position {
                x
                y
            }
        }
        # updated connectivity information
        connectors {
            ...connector_connector
        }
    }
}`


// end of file
