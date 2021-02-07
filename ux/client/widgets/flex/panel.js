// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React  from 'react'


// a container for client children
const panel = React.forwardRef(({idx, style, children}, ref) => {
    // paint me
    return (
        <div ref={ref} style={style} >
            {children}
        </div>
    )
})


// publish
export default panel


// end of file
