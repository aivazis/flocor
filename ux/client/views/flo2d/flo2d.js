// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
// framework
import React from 'react'
// routing
import { Switch, Route, useRouteMatch } from 'react-router-dom'

// locals
// hooks
import styles from './styles'
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


// the main app working area
// the layout is simple: the activity bar and activity dependent routing
export const Flo2d = () => {
    // get the current activity
    const match = useRouteMatch()

    // lay out the main page
    return (
        <section ref={ref} style={styles.panel} >
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
                    <Switch>
                        <Route path={`${match.path}compose`} >
                            <Flogram />
                        </Route>
                        <Route >
                            <NYI />
                        </Route>
                    </Switch>
                </Flex.Panel>

            </Flex.Box>

        </section >
    )
}


// end of file
