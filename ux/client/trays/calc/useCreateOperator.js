// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import { useMutation } from 'react-relay/hooks'
import { ConnectionHandler } from 'relay-runtime'
// project
// hooks
// grab the new node context management hooks
import { useSetNewNode, useClearNewNode } from '~/views/flo2d'


// adding a new node to the diagram requires sending a mutation to the server
// this hook builds a callback that adds a {calc} operator  to a {flow}
export const useCreateOperator = (factory) => {
    // get the callback that clears the new node info
    const clearNode = useClearNewNode()
    // build the mutation that sends the new node info to the server
    const [commitCreateOperator, isInFlight] = useMutation(createOperatorMutation)

    // make the mutator; {flow} is redundant and can be used to do a consistency check
    // that the server added the node to the correct flow
    const mutator = (flow, position) => {
        // that commits the new node to its flow
        commitCreateOperator({
            //  the mutation input payload
            variables: {
                info: {
                    // the id of the owning flow
                    flow,
                    // type info for the new node
                    family: factory.family,
                    // position
                    ...position
                }
            },
            // the {updater} that adjusts the {relay} store on successful commit
            updater: (store) => {
                // get the result payload
                const result = store.getRootField("addCalcOperator")
                // if we don't have one yet
                if (!result) {
                    // bail
                    return
                }

                // grab the flow that owns the new node
                const owner = result.getValue("flow")

                // add the new factory to the store
                // extract the new node
                const newFactory = result.getLinkedRecord("node")
                // get a proxy to the connection that will own the new factory
                const factories = ConnectionHandler.getConnection(
                    store.get(owner),
                    "factoriesFragment_factories"
                )
                // create an edge with the factory we just made
                const factoryEdge = ConnectionHandler.createEdge(
                    store, factories, newFactory, "FactoryEdge")
                // and add the new edge to the connection
                ConnectionHandler.insertEdgeAfter(factories, factoryEdge)

                // add the new slots to the store
                // extract the slots
                const newSlots = result.getLinkedRecords("slots")
                // get a proxy to the connection that will own the new slots
                const slots = ConnectionHandler.getConnection(
                    store.get(owner),
                    "slotsFragment_slots"
                )
                // go through the new slots and for each one
                newSlots.forEach(newSlot => {
                    // create an edge with the new slot
                    const slotEdge = ConnectionHandler.createEdge(
                        store, slots, newSlot, "SlotEdge")
                    // add it to the connection
                    ConnectionHandler.insertEdgeAfter(slots, slotEdge)
                })

                // add the new slots to the store
                // extract the connectors
                const newConnectors = result.getLinkedRecords("connectors")
                // get a proxy to the connection that will own the new slots
                const connectors = ConnectionHandler.getConnection(
                    store.get(owner),
                    "connectorsFragment_connectors"
                )
                // go through the new slots and for each one
                newConnectors.forEach(newConnector => {
                    // create an edge with the new slot
                    const connectorEdge = ConnectionHandler.createEdge(
                        store, connectors, newConnector, "ConnectorEdge")
                    // add it to the connection
                    ConnectionHandler.insertEdgeAfter(connectors, connectorEdge)
                })

                // all done
                return
            }
        })

        // clear the new node marker
        clearNode()
        // all done
        return
    }

    // unpack the relavant information
    const info = { family: factory.family }

    // use the {info, mutator} to build the item selector
    const selector = useSetNewNode({ info, mutator })
    // and return it
    return selector
}


// the mutation that adds a new node to the diagram
const createOperatorMutation = graphql`
mutation useCreateOperatorMutation($info: NewNodeInput!) {
    addCalcOperator(nodeinfo: $info) {
        # the id of the flow that owns the new node
        flow
        # a description of the newly created node
        node {
            ... factory_factory
        }
        slots {
            ... slot_slot
        }
        connectors {
            ... connector_connector
        }
    }
}`


// end of file
