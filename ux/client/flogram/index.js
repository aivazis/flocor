// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'

// locals
// widgets
import { Compass, Camera } from '~/widgets'
// styles
import styles from './styles'


// the flow graph display
export const Flogram = () => {
    // ask the server for the flow diagram
    const { flow } = useLazyLoadQuery(
        graphql`query flogramQuery {
            flow {
                id
                name
                family

                macros {
                    id
                    name
                    family
                }
            }
        }`
    )

    // show me
    console.log("flogram")

    // make a reference to my container so we can measure it and install listeners
    const ref = React.useRef(null)

    // build the container and return it
    return (
        <section ref={ref} style={styles.panel} >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" {...styles.canvas}>
                <Camera ref={ref} >
                    <Compass />
                </Camera >
            </svg>
        </section>
    )
}


// end of file
