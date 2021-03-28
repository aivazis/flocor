// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { useMutation } from 'react-relay/hooks'

// project
// hooks
import { useEvent } from '~/hooks'
import { useCamera } from '~/widgets/camera'
// locals
import { useNewNode, useClearNewNode } from '~/views/flo2d'
// locals


// attach event listeners to the diagram
export const Behaviors = React.forwardRef(({ refresh }, viewRef) => {
    // placing a new node on the diagram requires node info and a mutation
    // {trays} register type information with {flo2d} in order to place new nodes on the canvas
    const newNode = useNewNode()
    // the mutation sends the node info along with location information to the server
    const [commit, isInFlight] = useMutation(newNodeMutation)
    // and then we have to clear the new node indicator
    const clearNode = useClearNewNode()

    // we also need access to the camera state
    const { camera, els } = useCamera()

    // assemble the callback that registers the new node
    const createNode = (evt) => {
        // check whether there is a new node marker
        if (newNode === null) {
            // and bail if not
            return
        }

        // get the mouse coordinates
        const mx = evt.clientX
        const my = evt.clientY
        // get the origin of my view
        const { left, top } = viewRef.current?.getBoundingClientRect()
        // transform the mouse coordinates to a diagram coordinate system parallel to the view
        const rx = (mx - left - els * camera.x) / (els / camera.z)
        const ry = (my - top - els * camera.y) / (els / camera.z)
        // compute the length of this vector
        const r = (rx ** 2 + ry ** 2) ** 0.5
        // and its angle with the x-axis
        const phi = Math.atan2(ry, rx)
        // from that, we can compute its angle with the rotated diagram x-axis
        const theta = phi - Math.PI / 180 * camera.phi

        // now use the camera angle to project to the actual diagram coordinates
        const x = r * Math.cos(theta)
        const y = r * Math.sin(theta)

        console.log({ camera, rx, ry })

        // otherwise, assemble the node info and commit the change
        commit({
            variables: {
                info: {
                    category: newNode.category,
                    family: newNode.family,
                    x,
                    y,
                }
            }
        })

        // clear the new node indicator
        clearNode()

        // and refresh the query
        refresh(prev => ({
            fetchKey: (prev?.fetchKey ?? 0) + 1,
            fetchPolicy: 'network-only',
        }))

        // all done
        return
    }

    // when the mouse is released in my area
    useEvent({
        name: "mouseup", listener: createNode, client: viewRef,
        triggers: [newNode]
    })

    // build the container and return it
    return null
})


// the mutation that adds a new node to the diagram
const newNodeMutation = graphql`mutation behaviorsNewNodeMutation($info: NodeInfoInput!) {
    createNode(nodeinfo: $info) {
        # a description of the newly created node
        selection {
            id
        }
    }
}`


// end of file
