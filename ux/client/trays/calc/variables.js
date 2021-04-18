// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'

// project
// i am a tray
import { Tray } from '~/widgets'
// of nodes that are products
import { Product } from '~/trays'
// locals
// styles
import styles from './styles'


// a tray with product nodes
export const Variables = ({ els, style }) => {
    // get the set of basic traits from the server
    const { calcVariables } = useLazyLoadQuery(varQuery)

    // paint me
    return (
        <Tray title="calc variables" >
            {calcVariables.map(trait => (
                <Product key={trait.family} product={trait} els={els} style={style} />
            ))}
        </Tray >
    )
}


// the query text
const varQuery = graphql`query variablesQuery {
    calcVariables {
        family
    }
}`


// end of file
