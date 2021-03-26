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

// {camera} is the manager of the user's point of view
// this is a 3-axis zooming camera:
//
// - it can pan on the x-y plane
// - it can zoom along the z-axis
// - it can rotate about the z axis
//
// the units of these settings are up to the client
export const useCamera = (client, init = undefined) => {
    // initialize a camera and its controls and make them available
    const [camera, remote] = React.useReducer(dispatcher, newCamera(), init)

    // install the {keypad} bindings to the top level window
    useKeypad(keypad(remote))
    // and the {wheel} bindings to my view
    useWheel(wheel(remote), client)

    // publish the camera
    return camera
}


// end of file
