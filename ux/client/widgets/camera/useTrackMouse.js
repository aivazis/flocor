// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'

// project
// hooks
import { useEvent } from '~/hooks'


// keep track of the mouse location and build transform to and from ICS
export const useTrackMouse = (els, camera, clientRef) => {
    // set some state aside to keep track of the cursor location in ICS
    const [cursorPosition, setCursorPosition] = React.useState(null)

    // build the transform from from view port coordinates to ICS
    const toICS = (vx, vy) => {
        // get the origin of my view
        const { left, top } = clientRef.current?.getBoundingClientRect()
        // transform the mouse coordinates to a diagram coordinate system parallel to the view
        const rx = (vx - left - els * camera.x) / (els / camera.z)
        const ry = (vy - top - els * camera.y) / (els / camera.z)
        // compute the length of this vector
        const r = (rx ** 2 + ry ** 2) ** 0.5
        // and its angle with the x-axis
        const phi = Math.atan2(ry, rx)
        // from that, we can compute its angle with the rotated diagram x-axis
        const theta = phi - Math.PI / 180 * camera.phi

        // now use the camera angle to project to the actual diagram coordinates
        const x = Math.round(r * Math.cos(theta))
        const y = Math.round(r * Math.sin(theta))
        // and return them
        return { x, y }
    }

    // make a callback that queries the cursor position and computes the transform
    const track = (evt) => {
        // record the location
        setCursorPosition(toICS(evt.clientX, evt.clientY))
        // all done
        return
    }
    // and one the clears the tracking of the cursor
    const clear = () => {
        // by setting the position to null
        setCursorPosition(null)
        // all done
        return
    }

    // while the mouse is moving within my client's area
    useEvent({
        name: "mousemove", listener: track, client: clientRef,
        triggers: [camera]
    })
    // when it leaves
    useEvent({
        name: "mouseleave", listener: clear, client: clientRef,
        triggers: []
    })

    // publish the cursor position
    return { cursorPosition, toICS }
}


// end of file
