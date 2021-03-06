// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'

// project
// hooks
import { useEvent } from '~/hooks'
import { useCamera } from '~/widgets/camera'
import { useCreateNewNode } from '~/views/flo2d'
// local
import { useNodeMove } from './useNodeMove'
import { useNodeEndMove } from './useNodeEndMove'
import { useClearMovingNode } from './useClearMovingNode'


// attach event listeners to the diagram
export const Behaviors = React.forwardRef(({ flow }, viewRef) => {
    // grab the creator of new node
    const { newNode, createNode } = useCreateNewNode(flow)

    // to move a node
    const { moveNode, movingNodeInfo } = useNodeMove(flow)
    // when a node stops moving
    const { endMoveNode } = useNodeEndMove(flow)
    // to clear the moving node candidate
    const clearMovingNode = useClearMovingNode()

    // get help from the {camera} to convert mouse coordinates to the ICS
    const { toICS } = useCamera()
    // assemble the {mouseup} behaviors
    const mouseUp = (evt) => {
        // convert the cursor location to ICS
        const position = toICS(evt.clientX, evt.clientY)
        // check whether we are expected to make a new node
        createNode(position)
        // complete the movement of a node
        endMoveNode(position)
        // all done
        return
    }

    // assemble the {mousemove} behaviors
    const mouseMove = (evt) => {
        // convert the cursor location to ICS
        const position = toICS(evt.clientX, evt.clientY)
        // show me
        moveNode(position)
        // all done
        return
    }

    // assemble the {mouseleave} behaviors
    const mouseLeave = () => {
        // clear the moving node candidate
        clearMovingNode()
        // all done
        return
    }

    // when the mouse is moved in my area
    useEvent({
        name: "mousemove", listener: mouseMove, client: viewRef,
        triggers: [movingNodeInfo]
    })
    // when the mouse is released in my area
    useEvent({
        name: "mouseup", listener: mouseUp, client: viewRef,
        triggers: [newNode, movingNodeInfo]
    })
    // when the mouse leaves my area
    useEvent({
        name: "mouseleave", listener: mouseLeave, client: viewRef,
        triggers: [movingNodeInfo]
    })


    // build the container and return it
    return null
})


// end of file
