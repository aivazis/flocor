// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// project
// hooks
import { useEvent } from '~/hooks'
// locals
// styling
import styles from './styles'


// a container that displays an SVG image at a specific cursor location within a client area
export const Shadow = React.forwardRef(({ shadow, offset, style }, clientRef) => {
    // state for tacking the cursor location
    const [location, setLocation] = React.useState({ x: 0, y: 0 })

    // event handler to track and record the cursor location
    const trackLocation = (evt) => {
        // turn side effects off
        evt.preventDefault()
        // extract the cursor location
        const location = { x: evt.clientX, y: evt.clientY }
        // record it
        setLocation(location)
        // all done
        return
    }

    // install the location tracker
    useEvent({
        name: "mousemove", listener: trackLocation, client: clientRef,
        triggers: []
    })

    // if there is no shadow
    if (shadow == null) {
        // don't render anything
        return null
    }

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
            {shadow}
        </div>
    )
})


// end of file
