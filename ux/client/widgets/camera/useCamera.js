// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// camera actions
import { dispatcher, newCamera } from './reducer'

// {camera} is the manager of the user's point of view
// this is a 3-axis zooming camera:
//
// - it can pan on the x-y plane
// - it can zoom along the z-axis
// - it can rotate about the z axis
//
// the units of these settings are up to the client
export const useCamera = (init) => {
    // initialize a camera and its controls and make them available
    return React.useReducer(dispatcher, newCamera(), init)
}


// end of file
