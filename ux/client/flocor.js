// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// the component framework
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
// relay
import { RelayEnvironmentProvider } from 'react-relay/hooks'
// routing
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// generator support
import 'regenerator-runtime'


// locals
// styles
import styles from './styles'
// context
import { environment } from '~/context'
// views
import {
    // the main page
    Flo2d, GiQL,
    // the flex sandbox
    Flex,
    // boilerplate
    Loading, Stop,
    // layout
    Status,
} from '~/views'


// the app layout
const FloApp = () => {
    // page layout and top-level, disrupting, navigation
    // the app renders a client area over a status bar; most urls render the normal ui, but
    // - /stop: the user clicked on the "kill the server" action; show a "close this window" page
    // - /loading: shown while the app is fetching itself from the server

    // render
    return (
        <Switch>
            {/* the graphiql sandbox */}
            <Route path="/graphiql" component={GiQL} />
            <Route>
                <div style={styles.page}>
                    <Switch >
                        {/* the closing page */}
                        <Route path="/stop" component={Stop} />
                        {/* the page to render while waiting for data to arrive */}
                        <Route path="/loading" component={Loading} />

                        {/* the flex sandbox */}
                        <Route path="/flex" component={Flex} />
                        {/* show the app */}
                        <Route path="/" component={Flo2d} />
                    </Switch>
                    <Status />
                </div>
            </Route>
        </Switch>
    )
}


// the outer component that sets up access to the {relay}, {suspense}, and {router} environments
const Root = () => (
    <RelayEnvironmentProvider environment={environment}>
        <Suspense fallback={<Loading />}>
            <Router>
                <FloApp />
            </Router>
        </Suspense>
    </RelayEnvironmentProvider>
)


// render
ReactDOM.render(<Root />, document.getElementById('flocor'))


// end of file
