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
const Lens = ({ style, children }) => {
    // the camera factory
    const { camera, els } = useCamera()

    // unpack the camera parameters
    const { x, y, z, phi } = camera
    // compute the corresponding viewpoort coordinates
    const vx = els * x
    const vy = els * y
    const vz = els / z

    // pan
    const pan = `translate(${vx} ${vy})`
    // zoom
    const zoom = `scale(${vz})`
    // orient
    const twist = `rotate(${phi})`
    // assemble the transform
    const pov = [pan, zoom, twist].join(" ")

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
// {scale} is a length scale that is intrinsic to the contents; it describes the size in viewport
// pixels of the unit length in the content coordinate system
export const Camera = React.forwardRef(({ scale = 25, style, children }, viewRef) => {
    // set up he context provider and install the lens
    return (
        <Provider ref={viewRef} scale={scale}>
            <Lens style={style} >
                {children}
            </Lens>
        </Provider>
    )

})

// end of file
