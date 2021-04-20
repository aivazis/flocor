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

    // make a mutator
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
                const result = store.getRootField("addCalcVariable")
                // tell me
                console.log("adjusting the store:", store)
                // if we don't have one yet
                if (!result) {
                    // bail
                    return
                }
                // all done
                return
            }
        })

        // unpack the position
        const { x, y } = position
        // say something
        console.log(`new flow '${flow}': adding '${info.family}' at (${x}, ${y})`)

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
            # i need to ask for more stuff here
        }
    }
}`


// end of file
