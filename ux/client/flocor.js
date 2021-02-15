// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// the component framework
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


// locals
// styles
import styles from './styles'
// context
import { environment } from '~/context'
// views
import {
    // the main page
    Flo2d,
    // the flex sandbox
    Flex,
    // boilerplate
    Loading, Stop,
    // layout
    Header, Status,
} from '~/views'


// the app layout
const FloApp = () => {
    // render
    return (
        <div style={styles.layout}>
            <Header />
            <Switch>
                {/* the landing page */}
                <Route path="/flo2d" component={Flo2d} />
                {/* the flex sandbox */}
                <Route path="/flex" component={Flex} />
                {/* the closing page */}
                <Route path="/stop" component={Stop} />
                {/* the page to render while waiting for data to arrive */}
                <Route path="/loading" component={Loading} />

                {/* default landing spot */}
                <Route path="/" component={Flo2d} />
            </Switch>
            <Status />
        </div>
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
ReactDOM.unstable_createRoot(document.getElementById('flocor')).render(<Root />)


// end of file
