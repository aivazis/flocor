// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
import styles from './styles'


// the hex sandbox
const Panel = () => {
    // make a reference for the section
    const viewRef = React.useRef(null)

    // build the container and return it
    return (
        <section ref={viewRef} style={styles.panel} >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" {...styles.canvas}>
            </svg>
        </section>
    )
}


// publish
export default Panel


// end of file
