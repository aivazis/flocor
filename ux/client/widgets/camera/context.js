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
import { useTrackMouse } from './useTrackMouse'


// set up the camera context
export const Context = React.createContext(
    // the default value that consumers see when outside the provider
    {
        // the external length scale
        els: 1,
        // the camera
        camera: null,
        // transformation from the view port to the user coordinate system
        cursorPosition: null,
        // the transform to diagram coordinates
        toICS: null,
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
    // keep track of mouse movement and convert it to diagram coordinates
    const { cursorPosition, toICS } = useTrackMouse(els, camera, clientRef)

    // build the current value of the context
    const context = {
        // the external length scale
        els,
        // the current camera value
        camera,
        // the current cursor coordinates in ICS
        cursorPosition,
        // the transform to diagram coordinates
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
