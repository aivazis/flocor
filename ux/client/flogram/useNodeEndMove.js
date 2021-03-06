// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { useMutation } from 'react-relay/hooks'
import { ConnectionHandler } from 'relay-runtime'
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
        // clear the moving node marker
        setMovingNode(null)

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
                // grab the flow that owns the new node
                const owner = result.getValue("flow")
                // and the associated record from the store
                const record = store.get(owner)
                // get the dead node id
                const dead = result.getValue("dead")
                // if there isn't one, the move did not result in any collisions, hence there
                // are no changes to the diagram
                if (dead === null) {
                    // hence there's nothing further to do
                    return
                }

                // otherwise, get a proxy to the connection that owns the dead node
                const slots = ConnectionHandler.getConnection(
                    record, "slotsFragment_slots"
                )
                // remove it from the edges of the {slotsFragment_slots} connection
                ConnectionHandler.deleteNode(slots, dead)

                // get a proxy to the connection that owns the label
                const labels = ConnectionHandler.getConnection(
                    record, "labelsFragment_labels"
                )
                // get the pile of labels to remove
                const delLabels = result.getValue("delLabels")
                // go through them
                delLabels.forEach(label => {
                    // and remove each one
                    ConnectionHandler.deleteNode(labels, label)
                })
                // get the pile of new labels
                const newLabels = result.getLinkedRecords("newLabels")
                // go through them
                newLabels.forEach(label => {
                    // create an edge with the new label
                    const labelEdge = ConnectionHandler.createEdge(
                        store, labels, label, "LabelEdge"
                    )
                    // and add it to the connection
                    ConnectionHandler.insertEdgeAfter(labels, labelEdge)
                })

                // get a proxy the to the connection that owns the connectors
                const connectors = ConnectionHandler.getConnection(
                    record, "connectorsFragment_connectors"
                )
                // get the pile of connectors to discard
                const delConnectors = result.getValue("delConnectors")
                // go through them
                delConnectors.forEach(connector => {
                    // and remove each one
                    ConnectionHandler.deleteNode(connectors, connector)
                })
                // get the pile of new connectors
                const newConnectors = result.getLinkedRecords("newConnectors")
                // go through them
                newConnectors.forEach(connector => {
                    // create an edge with the new connector
                    const connectorEdge = ConnectionHandler.createEdge(
                        store, connectors, connector, "ConnectorEdge")
                    // add it to the connection
                    ConnectionHandler.insertEdgeAfter(connectors, connectorEdge)
                })

                return
            }
        })

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
        # the slot updates
        slot {
            ...slot_slot
        }
        # the dead node
        dead
        # and the new ones
        newLabels {
            ...label_label
        }
        # the obsolete labels
        delLabels
        # the label updates
        updatedLabels {
            ...label_label
        }
        # and the new ones
        newConnectors {
            ...connector_connector
        }
        # the obsolete connectors
        delConnectors
        # the connetor updates
        updatedConnectors {
            ...connector_connector
        }
    }
}`


// end of file
