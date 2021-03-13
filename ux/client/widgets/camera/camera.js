// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React, { useEffect } from 'react'
// locals
// hooks
import { useCamera } from './useCamera'
import { useKeypad } from './useKeypad'
import { useWheel } from './useWheel'
// event listeners
import { keypad } from './keypad'
import { wheel } from './wheel'
// get the {pan} action from the reducer so we can initialize the view
import { pan } from './reducer'
// styling
import styles from './styles'


// a scale and orientation indicator
export const camera = React.forwardRef(({ style, children }, viewRef) => {
    // conversion from the diagram intrinsic length scale to view port pixels
    const scale = 25

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
