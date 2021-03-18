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
// context
import { Provider } from './context'
// hooks
import { useShadow } from './useShadow'
import { useClearShadow } from './useClearShadow'
// styling
import styles from './styles'


// a container that displays a cursor sprite within a client area
const Sprite = React.forwardRef(({ style }, clientRef) => {
    // state for tracking the cursor location
    const [location, setLocation] = React.useState({ x: 0, y: 0 })

    // get the shadow and its shape
    const { shadow, offset } = useShadow()
    // build a callback that clears the shadow
    const clearShadow = useClearShadow()

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
    // clear the cursor shadow when the mouse is released
    useEvent({
        name: "mouseup", listener: clearShadow, client: clientRef,
        triggers: []
    })
    // also, clear the cursor shadow when the mouse leaves my client area
    useEvent({
        name: "mouseleave", listener: clearShadow, client: clientRef,
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


// wrap in a context provider
export const Shadow = React.forwardRef(({ style, children }, clientRef) => {
    // set up a context provider
    return (
        <Provider >
            {/* render my children */}
            {children}

            {/* and the cursor sprite, if any */}
            <Sprite ref={clientRef} style={style} />
        </Provider>
    )
})

// end of file
