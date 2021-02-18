// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
// framework
import React from 'react'
// routing
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// locals
import styles from './styles'
// widgets
import { Flex } from '~/widgets'
// activities
import { ActivityBar } from '~/activities'


// the main app working area
// the layout is simple: the activity bar and activity dependent routing
const Panel = () => {
    // configure a flex container with two panels
    const columns = [
        // the sider bar
        [ 200, Infinity ],
        // the work area
        [ 400, Infinity ],
    ]


    // build the container and return it
    return (
        <section style={styles.panel} >
            {/* navigation bar */}
            <ActivityBar style={styles.activitybar} />

            {/* a flex container with two panels */}
            <Flex direction="row" hints={columns} style={styles.flex} >
                {/* the activity specific sidebar */}
                <div style={styles.sidebar} >sidebar</div>

                {/* the activity specific workarea */}
                <div style={styles.canvas} >workarea</div>

            </Flex>
        </section>
    )
}


// publish
export default Panel


// end of file
