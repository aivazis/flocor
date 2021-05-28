// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'

// local
// the tray with the {calc} variables
import { Variables } from './variables'
// the tray with the {calc} operators
import { Operators } from './operators'

// the trays with nodes from the {calc} package
export const Calc = ({ els, style }) => {
    // get the catalog from the server
    const { catalog } = useLazyLoadQuery(calcQuery)

    // paint my trays
    return (
        <>
            <Variables els={els} specifications={catalog.specifications} style={style} />
            <Operators els={els} producers={catalog.producers} style={style} />
        </>
    )
}


// the query text
const calcQuery = graphql`query calcQuery {
    catalog(package: "flocor.calc") {
        producers {
            family
            inputs
            outputs
        }
        specifications {
            family
        }
    }
}`


// end of file
