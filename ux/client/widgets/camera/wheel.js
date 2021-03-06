// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// grab the actions
import { pan, zoom, rotate } from './reducer'


// a callback that maps {wheel} events to camera actions
// it takes a camera remote control and return an event listener bound to the remote
export const wheel = (els, remote) => (event) => {
    // ask the agent to ignore any overloads of this event
    event.preventDefault()

    // unpack
    const { deltaX, deltaY, ctrlKey, shiftKey } = event

    // scrolling with <ctrl> pressed
    if (ctrlKey) {
        // is a pan
        remote(pan(-deltaX / els, -deltaY / els))
        // all done
        return
    }

    // scrolling with <shift> pressed
    if (shiftKey) {
        // is a rotation by a small angle in a sense determined by whether
        // we are scrolling up or down
        const dphi = (deltaY > 0 ? -1 : 1) * 1
        // rotate
        remote(rotate(dphi))
        // all done
        return
    }

    // otherwise, scrolling is a zoom
    const dz = (deltaY > 0 ? -1 : 1) * .01
    // zoom
    remote(zoom(dz))

    // all done
    return
}


// end of file
