// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import { useMutation } from 'react-relay/hooks'
import { ConnectionHandler } from 'relay-runtime'

// project
// hooks
import { useNewNode, useClearNewNode } from '~/views/nodelib'


// the last step in adding a new node to the diagram is sending a mutation to the server
// this hook reads the new node information that was left behind in the {nodelib} context when
// the dragging operation started and uses it to build a callback that commits the mutation
export const useNodeCreate = (flow) => {
    // placing a new node on the diagram requires node info and a mutation; the {trays} register
    // type information with {nodelib} in order to place new nodes on the canvas
    const newNodeInfo = useNewNode()
    // the mutation sends the node info along with location information to the server
    const [commitCreateNode, isInFlight] = useMutation(createNodeMutation)
    // and then we have to clear the new node indicator
    const clearNode = useClearNewNode()

    // to create a new node
    const createNode = (position) => {
        // check whether there is a new node marker
        if (newNodeInfo === null) {
            // and bail if not
            return
        }

        // otherwise, assemble the node info and commit the change
        commitCreateNode({
            variables: {
                info: {
                    // type info
                    family: newNodeInfo.family,
                    // position
                    ...position
                }
            },
            updater: (store) => {
                const result = store.getRootField("createNode")
                // if we don't have one yet
                if (!result) {
                    // bail
                    return
                }

                // get a proxy to the connection that should own the new node
                const allMacros = ConnectionHandler.getConnection(
                    store.get(flow),
                    "macrosFragment_macros"
                )

                // grab a reference to the node we created
                const newMacro = result.getLinkedRecord('node')

                // create an edge with the product we just made
                const edge = ConnectionHandler.createEdge(store, allMacros, newMacro, 'MacroEdge')
                // and the new edge to the connection
                ConnectionHandler.insertEdgeAfter(allMacros, edge)

                // all done
                return
            }
        })

        // clear the new node indicator
        clearNode()

        // all done
        return
    }

    // build the container and return it
    return { createNode, newNodeInfo }
}


// the mutation that adds a new node to the diagram
const createNodeMutation = graphql`mutation useNodeCreateMutation($info: CreateNodeInput!) {
    createNode(nodeinfo: $info) {
        # a description of the newly created node
        node {
            id
            ...macro_macro
        }
    }
}`


// end of file
