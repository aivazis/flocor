// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import { useEffect } from 'react'


// register a {handler} with {client} for the given event {name} that gets updated
// whenever {triggers} are modified
export default ({name=throwError(), handler=throwError(), client=null, triggers=[]}) => {
    // create an effect
    useEffect(() => {
        // figure out the effect target
        const target = client?.current || window
        // add {handler} as an event listener
        target.addEventListener(name, handler)
        // make a controller; not sure whether this required, useful, harmful...
        const controller = new AbortController()
        // and register a clean up
        return () => {
            // that removes the listener
            target.removeEventListener(name, handler)
            // and aborts any pending requests
            controller.abort()
        }
    // register the refresh {triggers}
    }, triggers)

    // all done
    return
}


// end of file