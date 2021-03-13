// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// local
import { useEvent } from '~/hooks'


// attach {controller} as a listener to {wheel} events
export const useWheel = (controller, client) => {
    // tell {useEvent} what we want
    return useEvent({ name: "wheel", listener: controller, client })
}


// end of file
