// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'

// locals
// context
import { Provider } from './context'
// hooks
import { useCamera } from './useCamera'
// styling
import styles from './styles'


// a passive transformation to the intrinsic coordinate system (ICS) of the diagram
// {scale} is a length scale that is intrinsic to the contents; it converts a unit length in
// content to a number of view port pixels
const Lens = ({ style, children }) => {
    // the camera factory
    const { camera, els } = useCamera()

    // pan
    const panXform = `translate(${els * camera.x} ${els * camera.y})`
    // zoom
    const zoomXform = `scale(${els / camera.z})`
    // orient
    const twistXform = `rotate(${camera.phi})`
    // assemble the transform
    const pov = panXform + " " + zoomXform + " " + twistXform

    // mix my paint
    const cameraStyle = { ...styles, ...style }

    // render
    return (
        <g transform={pov} style={cameraStyle} >
            {children}
        </g>
    )
}


// turn it into a context provider and publish it
export const Camera = React.forwardRef(({ scale = 25, style, children }, viewRef) => {
    // set up he context provider and install the lens
    return (
        <Provider ref={viewRef} scale={scale}>
            <Lens scale={scale} >
                {children}
            </Lens>
        </Provider>
    )

})

// end of file
