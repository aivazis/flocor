// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
// framework
import React from 'react'
// routing
import { Switch, Route, useRouteMatch } from 'react-router-dom'

// project
// sidebars
import { NodeLibrary } from '~/views'
// canvases
import { NYI } from '~/views'
// activities
import { ActivityBar } from '~/activities'
// editors
import { Flogram } from '~/flogram'
// widgets
import { Flex } from '~/widgets'
// local
// context
import { Provider } from './context'
// hooks
import { useInteractionContainer } from './useInteractionContainer'
// styles
import styles from './styles'

// the main app working area
// the layout is simple: the activity bar and activity dependent routing
const Panel = () => {
    // get the current activity
    const match = useRouteMatch()
    // get the ref to the interaction container
    const containerRef = useInteractionContainer()

    // lay out the main page
    return (
        <section ref={containerRef} style={styles.panel} >
            {/* navigation bar */}
            <ActivityBar style={styles.activitybar} />

            {/* a flex container with two panels */}
            <Flex.Box direction="row" style={styles.flex} >

                {/* the activity specific sidebar */}
                <Flex.Panel min={200} style={{ ...styles.flex, ...styles.sidebar }} >
                    <Switch>
                        <Route path={`${match.path}compose`} >
                            <NodeLibrary />
                        </Route>
                    </Switch>
                </Flex.Panel>

                {/* the activity specific work area */}
                <Flex.Panel min={400} style={{ ...styles.flex, ...styles.canvas }} >
                    <Flogram />
                </Flex.Panel>

            </Flex.Box>

        </section >
    )
}


// turn it into a context provider and export it
export const Flo2d = () => {
    // set up the context provider
    return (
        <Provider>
            <Panel />
        </Provider>
    )
}


// end of file
