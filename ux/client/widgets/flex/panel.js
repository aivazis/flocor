// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React  from 'react'

// locals
// styles
import styles from './styles'

// a container for client children
const panel = React.forwardRef(({idx, style, children}, ref) => {
    // mix my styles
    const panelStyle = { ...styles.panel, ...style }

    // paint me
    return (
        <div ref={ref} style={panelStyle} >
            {children}
        </div>
    )
})


// publish
export default panel


// end of file
