// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'

// locals
// camera actions
import { dispatcher, newCamera } from './reducer'
// event listeners
import { keypad } from './keypad'
import { wheel } from './wheel'
// user interaction
import { useKeypad } from './useKeypad'
import { useWheel } from './useWheel'



// set up the camera context
export const Context = React.createContext(
    // the default value that consumers see when outside the provider
    {
        // the camera
        camera: null,
        // transformation from the view port to the user coordinate system
        toICS: () => { throw new Error('no camera context provider') },
    }
)


// the provider factory
export const Provider = React.forwardRef(({ scale, children }, clientRef) => {
    // save the external length scale
    const els = scale
    // initialize a camera and its controls and make them available
    const [camera, remote] = React.useReducer(dispatcher, newCamera())

    // install the {keypad} bindings to the top level window
    useKeypad(keypad(remote))
    // and the {wheel} bindings to my view
    useWheel(wheel(remote), clientRef)

    // build the transformation from view port to diagram coordinates
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
        const x = r * Math.cos(theta)
        const y = r * Math.sin(theta)
        // and return them
        return { x, y }
    }

    // build the current value of the context
    const context = {
        // the external length scale
        els,
        // the current camera value
        camera,
        // the transformer from mouse coordinates to user coordinates
        toICS,
    }

    // provide for my children
    return (
        <Context.Provider value={context} >
            {children}
        </Context.Provider >
    )
})

// end of file
