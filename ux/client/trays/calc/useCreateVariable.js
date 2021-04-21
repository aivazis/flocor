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
// this hook builds a callback that adds a {calc} variable to a {flow}
export const useCreateVariable = (product) => {
    // get the callback that clears the new node info
    const clearNode = useClearNewNode()
    // build the mutation that sends the new node info to the server
    const [commitCreateVariable, isInFlight] = useMutation(createVariableMutation)

    // make the mutator; {flow} is redundant and can be used to do a consistency check
    // that the server added the node to the correct flow
    const mutator = (flow, position) => {
        // that commits the new node to its flow
        commitCreateVariable({
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
                const result = store.getRootField("addCalcVariable")
                // if we don't have one yet
                if (!result) {
                    // bail
                    return
                }

                // grab the flow that owns the new node
                const owner = result.getValue("flow")
                // extract the new node
                const node = result.getLinkedRecord("node")

                // get a proxy to the connection that will own the new product
                const products = ConnectionHandler.getConnection(
                    store.get(owner),
                    "productsFragment_products"
                )

                // create an edge with the product we just made
                const edge = ConnectionHandler.createEdge(store, products, node, 'ProductEdge')
                // and the new edge to the connection
                ConnectionHandler.insertEdgeAfter(products, edge)

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
    const info = { family: product.family }

    // use the {info, mutator} to build the item selector
    const selector = useSetNewNode({ info, mutator })
    // and return it
    return selector
}


// the mutation that adds a new node to the diagram
const createVariableMutation = graphql`
mutation useCreateVariableMutation($info: NewNodeInput!) {
    addCalcVariable(nodeinfo: $info) {
        # the id of the flow that owns the new node
        flow
        # a description of the newly created node
        node {
            id
            position {
                x
                y
            }
        }
    }
}`


// end of file
