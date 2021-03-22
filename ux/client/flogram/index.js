// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useLazyLoadQuery, useMutation } from 'react-relay/hooks'

// project
// hooks
import { useEvent } from '~/hooks'
import { useNewNode, useClearNewNode } from '~/views/flo2d'
// locals
// widgets
import { Compass, Camera } from '~/widgets'
// styles
import styles from './styles'


// the flow graph display
export const Flogram = () => {
    // ask the server for the flow diagram
    const { flow } = useLazyLoadQuery(flogramQuery)

    // placing a new node on the diagram requires node info and a mutation
    // {trays} register type information with {flo2d} in order to place new nodes on the canvas
    const newNode = useNewNode()
    // the mutation sends the node info along with location information to the server
    const [commit, isInFlight] = useMutation(newNodeMutation)

    // assemble the callback that registers the new node
    const createNode = (evt) => {
        // assemble the node info and commit the change
        commit({
            variables: {
                info: {
                    category: newNode.category,
                    family: newNode.family,
                    x: evt.clientX,
                    y: evt.clientY,
                }
            }
        })
        // all done
        return
    }

    // make a reference to my container so we can measure it and install listeners
    const ref = React.useRef(null)

    // when the mouse is released in my area
    useEvent({
        name: "mouseup", listener: createNode, client: ref,
        triggers: [newNode]
    })

    // build the container and return it
    return (
        <section ref={ref} style={styles.panel} >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" {...styles.canvas}>
                <Camera ref={ref} >
                    <Compass />
                </Camera >
            </svg>
        </section>
    )
}


// the flow query
const flogramQuery = graphql`query flogramQuery {
    flow {
        # flow metadata
        id
        name
        family
        # atoms
        macros {
            id
            name
            family
            position {
                x
                y
            }
       }
   }
}`


// the mutation that adds a new node to the diagram
const newNodeMutation = graphql`mutation flogramNewNodeMutation($info: NodeInfoInput!) {
    createNode(nodeinfo: $info) {
        # the id of the newly created node
        id
    }
}`


// end of file
