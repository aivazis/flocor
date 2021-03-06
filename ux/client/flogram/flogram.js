// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'

// project
// hooks
import { useClearSelection } from '~/views/flo2d'
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
import { Slots } from './slots'
// connectors
import { Connectors } from './connectors'
// labels
import { Labels } from './labels'
// styles
import styles from './styles'


// the flow graph display
const Diagram = () => {
    // make a reference to my container so we can measure it and install listeners
    const ref = React.useRef(null)

    // ask the server for the flow diagram
    const { flow } = useLazyLoadQuery(flogramQuery, {})
    // to clear the selection
    const clearSelection = useClearSelection()

    // the canvas controls
    const canvasControls = {
        onClick: clearSelection
    }

    // build the container and return it
    return (
        <section ref={ref} style={styles.panel} >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                {...styles.canvas} {...canvasControls} >
                {/* global defs */}
                <Globals />
                {/* everything that is in ICS */}
                <Camera ref={ref} scale={15} >
                    {/* diagram behaviors */}
                    <Behaviors ref={ref} flow={flow.id} />
                    {/* the current cell highlighter, an experiment in not rendering a grid */}
                    <Grid />
                    {/* the origin/orientation marker */}
                    <Compass />
                    {/* labels */}
                    <Labels flow={flow} />
                    {/* connectors */}
                    <Connectors flow={flow} />
                    {/* slots */}
                    <Slots flow={flow} />
                    {/* factories */}
                    <Factories flow={flow} />
                </Camera >
            </svg>
        </section >
    )
}


// the flow query
const flogramQuery = graphql`query flogramQuery {
    flow {
        # flow metadata
        id
        # factory connection
        ...factories_flow
        # bound and unbound slots
        ...slots_flow
        # connectors
        ...connectors_flow
        # labels
        ...labels_flow
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
