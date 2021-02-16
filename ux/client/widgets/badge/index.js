// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
import styles from './styles'


// a button with an SVG image as content
const badge = ({ size=32, style, children }) => {
    // mix my paint
    // for the container
    const badgeStyle = {
        ...style?.badge, ...styles.badge,
        width: size,
        height: size,
    }
    // and the shape
    const shapeStyle = { ...styles.shape, ...style?.shape }

    // make a ref for the shape container
    const ref = React.useRef()

    // state controls
    // the default state
    const normal = () => {
        // get the style of the shape container
        const style = ref.current.style
        // style it
        style.fillOpacity = 0.5
        style.strokeOpacity = 0.5
        // all done
        return
    }
    // when the shape is highlighted
    const emph = () => {
        // get the style of the shape container
        const style = ref.current.style
        // style it
        style.fillOpacity = 1
        style.strokeOpacity = 1
        // all done
        return
    }
    // map the controls to mouse events
    const controls = {
        onMouseEnter: emph,
        onMouseLeave: normal,
    }

    // scale to size, assuming the shape is drawn in a 1k^2 box
    const shrink = `scale(${size/1000})`

    // paint me
    return (
        <div style={badgeStyle} {...controls} >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={size} height={size} >
                <g ref={ref} transform={shrink} style={shapeStyle} >
                    {children}
                </g>
            </svg>
        </div>
    )
}


// publish
export default badge


// end of file
