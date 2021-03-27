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
export const Provider = React.forwardRef(({ children }, clientRef) => {
    // initialize a camera and its controls and make them available
    const [camera, remote] = React.useReducer(dispatcher, newCamera())

    // install the {keypad} bindings to the top level window
    useKeypad(keypad(remote))
    // and the {wheel} bindings to my view
    useWheel(wheel(remote), clientRef)

    // build the transformation from view port to diagram coordinates
    const toICS = () => {
        // all done
        return
    }

    // build the current value of the context
    const context = {
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