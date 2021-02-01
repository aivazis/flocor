// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useFragment, useLazyLoadQuery } from 'react-relay/hooks'
// locals
import { Compass } from '~/widgets'
import styles from './styles'


// the hex sandbox
const Panel = () => {
    // make a reference for the section
    const viewRef = React.useRef(null)

    // load a query
    const data = useLazyLoadQuery(
        graphql`
            query flo2dQuery {
                catalog {
                    producers {
                        family
                    }
                    specifications {
                        family
                    }
                }
            }`
    )

    // build the container and return it
    return (
        <section ref={viewRef} style={styles.panel} >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" {...styles.canvas}>
                <g transform="translate(200 200) scale(100)" >
                    <Compass />
                </g>
            </svg>
        </section>
    )
}


// publish
export default Panel


// end of file
