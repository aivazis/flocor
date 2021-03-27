// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// the action identifiers
const CAMERA_MOVE = '@flocor/CAMERA_MOVE'
const CAMERA_ROTATE = '@flocor/CAMERA_ROTATE'
const CAMERA_HOME = '@flocor/CAMERA_HOME'

// the camera constructor
export const newCamera = () => ({
    // the location of the camera
    x: 1,
    y: 1,
    z: 1,
    // the orientation of the camera
    phi: 0,
})

// the actions
// move around the x-y plane
export const pan = (dx, dy) => ({
    // mark the action type
    type: CAMERA_MOVE,
    // record the displacement
    pan: { dx, dy, dz: 0 },
})

// zoom
export const zoom = (dz) => ({
    // mark the action type
    type: CAMERA_MOVE,
    // record the displacement
    pan: { dx: 0, dy: 0, dz },
})

// rotate
export const rotate = (angle) => ({
    // mark the action type
    type: CAMERA_ROTATE,
    // record the angle
    angle,
})

// reset
export const reset = () => ({
    // mark the action type
    type: CAMERA_HOME,
})


// the reducers
// move the camera on the x-y lane
const updateLocation = (camera, { pan }) => ({
    // copy the current camera state
    ...camera,
    // and adjust its location
    x: camera.x + pan.dx,
    y: camera.y + pan.dy,
    // don't let the {z} coordinate get too close to the origin
    z: Math.max(camera.z + pan.dz, 0.1),
})

// update the camera angle
const updateOrientation = (camera, { angle }) => ({
    // copy the current camera state
    ...camera,
    // update the camera orientation
    phi: camera.phi + angle,
})


// revert back to the initial state
const goHome = () => newCamera()


// the dispatch table
let dispatch = new Map()
// add the pan
dispatch.set(CAMERA_MOVE, updateLocation)
// the rotation
dispatch.set(CAMERA_ROTATE, updateOrientation)
// the reset
dispatch.set(CAMERA_HOME, goHome)


// the dispatcher looks up the {action.type} and invokes the associated reducer
export const dispatcher = (camera, action) => dispatch.get(action.type)(camera, action)


// end of file
