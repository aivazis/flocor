// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// locals
import { useEvent } from '~/hooks'


// wire the {keypad} as a handler of keyboard events
export const useKeypad = (controller) => {
    // unpack the event handlers
    const { keyup, keydown } = controller

    // and register them with the window, rather than the {client};
    // this is unfortunate but important, since keyboard events are only dispatched to elements
    // that have focus
    useEvent({ name: 'keyup', listener: keyup })
    useEvent({ name: 'keydown', listener: keydown })

    // all done
    return
}


// end of file
