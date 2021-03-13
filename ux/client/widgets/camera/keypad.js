// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// grab the actions
import { pan, zoom, rotate, reset } from './reducer'


// a callback that maps keyboard events to camera actions
export const keypad = (remote, viewRef) => {
    // make a dispatch table
    let dispatch = new Map()

    // the smallest panning increment
    const dr = 0.25
    dispatch.set('a', pan(-dr, 0))
    dispatch.set('d', pan(+dr, 0))
    dispatch.set('w', pan(0, -dr))
    dispatch.set('x', pan(0, +dr))

    // the smallest zooming increment
    const dz = 0.05
    // zoom
    dispatch.set('z', zoom(-dz))
    dispatch.set('c', zoom(+dz))

    // the smallest orientation change
    const dphi = 5
    // rotate
    dispatch.set('q', rotate(-dphi))
    dispatch.set('e', rotate(+dphi))

    // reset
    dispatch.set('s', reset(viewRef))

    // when a key is pressed
    const keydown = ({ key }) => {
        // look up the registered handler
        const action = dispatch.get(key)
        // if we have one
        if (action) {
            // invoke it
            remote(action)
        }
        // all done
        return
    }

    // currently, there is no behavior attached to when a key is released
    const keyup = null

    // bundle the handlers and return them
    return { keyup, keydown }
}


// end of file
