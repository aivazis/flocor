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
// behaviors
import { Behaviors } from './behaviors'
// diagram nodes
import { Macros } from './macros'
// styles
import styles from './styles'


// the flow graph display
export const Flogram = () => {
    // make a reference to my container so we can measure it and install listeners
    const ref = React.useRef(null)

    // set up state to manage query refreshing until we set up subscriptions
    const [refreshOptions, setRefreshOptions] = React.useState(null)
    // ask the server for the flow diagram
    const { flow } = useLazyLoadQuery(flogramQuery, {}, refreshOptions)

    // build the container and return it
    return (
        <section ref={ref} style={styles.panel} >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" {...styles.canvas}>
                <Camera ref={ref} >
                    {/* diagram behaviors */}
                    <Behaviors ref={ref} refresh={setRefreshOptions} />
                    {/* the origin/orientation marker */}
                    <Compass />
                    {/* macros */}
                    <Macros nodes={flow.macros} />
                </Camera >
            </svg>
        </section>
    )
}


// the flow query
const flogramQuery = graphql`query flogramQuery {
    flow {
        # flow metadata
        id
        name
        family
        # atoms
        macros {
            ...macrosFragment_nodes
        }
   }
}`


// end of file
