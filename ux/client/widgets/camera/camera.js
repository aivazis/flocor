// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
// hooks
import { useCamera } from './useCamera'
import { useKeypad } from './useKeypad'
import { useWheel } from './useWheel'
// event listeners
import { keypad } from './keypad'
import { wheel } from './wheel'
// styling
import styles from './styles'


// a passive transformation to the user's coordinate system (UCS)
// {scale} is a length scale that is intrinsic to the contents; it converts a unit length in
// content to a number of view port pixels
export const camera = React.forwardRef(({ scale = 25, style, children }, viewRef) => {
    // the camera factory
    const [camera, remote] = useCamera()
    // install the {keypad} bindings to the top level window
    useKeypad(keypad(remote))
    // and the {wheel} bindings to my view
    useWheel(wheel(remote), viewRef)

    // pan
    const panXform = `translate(${scale * camera.x} ${scale * camera.y})`
    // zoom
    const zoomXform = `scale(${scale / camera.z})`
    // orient
    const twistXform = `rotate(${camera.phi})`
    // assemble the net transform
    const pov = panXform + " " + zoomXform + " " + twistXform

    // mix my paint
    const cameraStyle = { ...styles, ...style }

    // render
    return (
        <g transform={pov} style={cameraStyle} >
            {children}
        </g>
    )
})


// end of file
