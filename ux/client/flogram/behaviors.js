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
// local
import { useNodeCreate } from './useNodeCreate'


// attach event listeners to the diagram
export const Behaviors = React.forwardRef(({ refresh }, viewRef) => {
    // to create a new node
    const { newNodeInfo, createNode } = useNodeCreate(refresh)

    // get help from the {camera} to convert mouse coordinates to the ICS
    const { toICS } = useCamera()
    // assemble the {mouseup} behaviors
    const mouseUp = (evt) => {
        // convert the cursor location to ICS
        const position = toICS(evt.clientX, evt.clientY)
        // node creation
        createNode(position)
        // all done
        return
    }

    // when the mouse is released in my area
    useEvent({
        name: "mouseup", listener: mouseUp, client: viewRef,
        triggers: [newNodeInfo]
    })

    // build the container and return it
    return null
})


// end of file
