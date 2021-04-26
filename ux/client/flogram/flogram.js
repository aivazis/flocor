// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'

// project
// widgets
import { Compass, Camera } from '~/widgets'

// locals
// context
import { Provider } from './context'
// global definitions
import { Globals } from './globals'
// behaviors
import { Behaviors } from './behaviors'
// the grid
import { Grid } from './grid'
// diagram nodes
import { Factories } from './factories'
import { Products } from './products'
import { Slots } from './slots'
// styles
import styles from './styles'


// the flow graph display
const Diagram = () => {
    // make a reference to my container so we can measure it and install listeners
    const ref = React.useRef(null)

    // ask the server for the flow diagram
    const { flow } = useLazyLoadQuery(flogramQuery, {})

    // build the container and return it
    return (
        <section ref={ref} style={styles.panel} >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" {...styles.canvas}>
                {/* global defs */}
                <Globals />
                {/* everything that is in ICS */}
                <Camera ref={ref} >
                    {/* diagram behaviors */}
                    <Behaviors ref={ref} flow={flow.id} />
                    {/* the current cell highlighter, an experiment in not rendering a grid */}
                    <Grid />
                    {/* the origin/orientation marker */}
                    <Compass />
                    {/* slots */}
                    <Slots flow={flow} />
                    {/* factories */}
                    <Factories flow={flow} />
                    {/* products */}
                    <Products flow={flow} />
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
        # product connection
        ...products_flow
        # factory connection
        ...factories_flow
        # unbound products
        ...slots_flow
   }
}`


// turn the diagram into a context provider
export const Flogram = () => {
    // set up the context provider
    return (
        <Provider>
            <Diagram />
        </Provider>
    )
}


// end of file
