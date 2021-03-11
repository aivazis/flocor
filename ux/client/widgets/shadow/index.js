// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
import styles from './styles'


// a container that displays an SVG image at a specific cursor location
const shadow = ({ location, offset, style, children }) => {
    // mix my paint
    const shadowStyle = {
        // from me
        ...styles,
        // from my caller
        ...style,
        // and the styling necessary to position the shape at the cursor location
        left: location.x + offset.x,
        top: location.y + offset.y,
    }

    // paint me
    return (
        <div style={shadowStyle} >
            {children}
        </div>
    )
}


// publish
export default shadow


// end of file
