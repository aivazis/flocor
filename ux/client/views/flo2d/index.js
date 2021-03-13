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
import { useEvent } from '~/hooks'
import styles from './styles'
// my context
import { Provider } from './context'
import useShadow from './useShadow'
import useShadowOffset from './useShadowOffset'
import useCursorLocation from './useCursorLocation'
// sidebars
import { NodeLibrary } from '~/views'
// canvases
import { NYI } from '~/views'
// activities
import { ActivityBar } from '~/activities'
// editors
import { Flogram } from '~/flogram'
// widgets
import { Flex, Shadow } from '~/widgets'


// the main app working area
// the layout is simple: the activity bar and activity dependent routing
const Panel = () => {
    // make a ref for my top level element
    const ref = React.useRef(null)
    // get the current activity
    const match = useRouteMatch()
    // make a callback that resets the cursor shadow when the mouse is released
    const { shadow, attachShadow: clearShadow } = useShadow({ shadow: null })
    // keep track of the cursor location
    const { cursorLocation, trackCursorLocation } = useCursorLocation()
    // and the current shadow offset
    const { shadowOffset } = useShadowOffset({ x: 0, y: 0 })

    // install the event listeners
    // track the location of the cursor while the mouse is moving
    useEvent({
        name: "mousemove", listener: trackCursorLocation, client: ref,
        triggers: [cursorLocation, shadowOffset]
    })
    // clear the cursor shadow when the mouse is released
    useEvent({
        name: "mouseup", listener: clearShadow, client: ref,
        triggers: [shadow]
    })
    // also, clear the cursor shadow when the mouse leaves my client area
    useEvent({
        name: "mouseleave", listener: clearShadow, client: ref,
        triggers: [shadow]
    })

    // the cursor shadow
    const cursorShadow = (
        shadow
            ? <Shadow location={cursorLocation} offset={shadowOffset} >{shadow}</Shadow>
            : null
    )

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

                {/* the activity specific workarea */}
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

            {/* if there is a shadow, place a shape at the cursor location */}
            {cursorShadow}
        </section >
    )
}


// turn the panel into a context provider
export default () => {
    // set up the context provider
    return (
        <Provider >
            <Panel />
        </Provider>
    )
}


// end of file
