// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'

// locals
import { Tray, Node } from '~/trays'
// styles
import styles from './styles'


// a tray with a flow node
const tray = () => {
    // get the computational environment from the server
    const { traits } = useLazyLoadQuery(
        graphql`query traitsQuery {
            traits {
                schema
                category
            }
        }`
    )

    // paint me
    return (
        <Tray title="pyre traits">
            {traits.map(trait => <Node key={trait.schema} family={trait.schema} />)}
        </Tray >
    )
}


// publish
export default tray


// end of file
