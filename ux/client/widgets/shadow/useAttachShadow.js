// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
// context
import { Context } from './context'


// callback factory that binds the shadow mutators to a given shape and offset
export const useAttachShadow = (shape, offset) => {
    // grab the shadow and offset mutators
    const { setShadow, setOffset } = React.useContext(Context)

    // make a callback that will attach the given shadow and offset
    const attach = () => {
        // set the shadow
        setShadow(shape)
        // and the offset
        setOffset(offset)
        // all done
        return
    }

    return attach
}


// end of file
