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
// this hook builds a callback that adds a product to a {flow}
export const useCreateProduct = (product) => {
    // get the callback that clears the new node info
    const clearNode = useClearNewNode()
    // build the mutation that sends the new node info to the server
    const [commitCreateProduct, isInFlight] = useMutation(createProductMutation)

    // make the mutator; {flow} is redundant and can be used to do a consistency check
    // that the server added the node to the correct flow
    const mutator = (flow, position) => {
        // that commits the new node to its flow
        commitCreateProduct({
            //  the mutation input payload
            variables: {
                info: {
                    // the id of the owning flow
                    flow,
                    // type info for the new node
                    family: product.family,
                    // position
                    ...position
                }
            },
            // the {updater} that adjusts the {relay} store on successful commit
            updater: (store) => {
                // get the result payload
                const result = store.getRootField("addProduct")
                // if we don't have one yet
                if (!result) {
                    // bail
                    return
                }

                // grab the flow that owns the new node
                const owner = result.getValue("flow")
                // and the associated record
                const record = store.get(owner)

                // extract the new node
                const slot = result.getLinkedRecord("slot")
                // get a proxy to the connection that will own the new product
                const slots = ConnectionHandler.getConnection(
                    record, "slotsFragment_slots"
                )
                // create an edge with the product we just made
                const slotEdge = ConnectionHandler.createEdge(store, slots, slot, "SlotEdge")
                // and add the new edge to the connection
                ConnectionHandler.insertEdgeAfter(slots, slotEdge)

                // extract the label
                const newLabels = result.getLinkedRecords("labels")
                // get a proxy to the connection that will own the new label
                const labels = ConnectionHandler.getConnection(
                    record, "labelsFragment_labels"
                )
                // go through the new ones
                newLabels.forEach(label => {
                    // create an edge with the new label
                    const labelEdge = ConnectionHandler.createEdge(
                        store, labels, label, "LabelEdge")
                    // add it to the connection
                    ConnectionHandler.insertEdgeAfter(labels, labelEdge)
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

    // unpack the relevant information
    const info = { family: product.family }

    // use the {info, mutator} to build the item selector
    const selector = useSetNewNode({ info, mutator })
    // and return it
    return selector
}


// the mutation that adds a new node to the diagram
const createProductMutation = graphql`
mutation useCreateProductMutation($info: NewNodeInput!) {
    addProduct(nodeinfo: $info) {
        # the id of the flow that owns the new node
        flow
        # a description of the newly created node
        slot {
            ... slot_slot
        }
        # and its label
        labels {
            ... label_label
        }
    }
}`


// end of file
