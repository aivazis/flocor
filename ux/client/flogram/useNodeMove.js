// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import { useMutation } from 'react-relay/hooks'

// project
// hooks
import { useMovingNode } from './useMovingNode'
import { useClearMovingNode } from './useClearMovingNode'


// the last step in moving a flow node is sending a mutation to the server
// this hook reads the node information that was left behind in the {flogram} context when
// the dragging operation started and uses it to build a callback that commits the mutation
export const useNodeMove = (refresh) => {
    // clicking on a node registers it as a move candidate with the {flogram} context
    const movingNodeInfo = useMovingNode()
    // the mutation sends the new location information to the server
    const [commitMoveNode, isInFlight] = useMutation(moveNodeMutation)
    // and then we have to clear the new node indicator
    const clearMovingNode = useClearMovingNode()

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
            }
        })

        // and refresh the query
        refresh(prev => ({
            fetchKey: (prev?.fetchKey ?? 0) + 1,
            fetchPolicy: 'network-only',
        }))

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
    }
}`


// end of file
