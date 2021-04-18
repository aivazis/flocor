// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'

// project
// i'm a tray
import { Tray } from '~/widgets'
// of nodes that are factories
import { Factory } from '~/trays'
// locals
// styles
import styles from './styles'


// a tray with factory nodes
export const Operators = ({ els, style }) => {
    // get the set of basic {calc} operators
    const { calcOperators } = useLazyLoadQuery(opQuery)

    // paint me
    return (
        <Tray title="calc operators" >
            {calcOperators.map(op => (
                <Factory key={op.family} factory={op} els={els} style={style} />
            ))}
        </Tray >
    )
}


// the query string
const opQuery = graphql`query operatorsQuery {
    calcOperators {
        family
        inputs
        outputs
    }
}
`

// end of file