// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
// context
import { Context } from './context'


// callback factory that clears the shadow by binding the mutators with null arguments
export const useClearShadow = () => {
    // grab the shadow and offset mutators
    const { setShadow, setOffset } = React.useContext(Context)

    // make a callback that will attach the given shadow and offset
    const clear = () => {
        // set the shadow
        setShadow(null)
        // and the offset
        setOffset({ x: 0, y: 0 })
        // all done
        return
    }

    return clear
}


// end of file
