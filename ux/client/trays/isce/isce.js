// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'

// local
// the tray with the {isce} products
import { Products } from './products'
// the tray with the {isce} factories
import { Factories } from './factories'


// the trays with nodes from the {isce} package
export const ISCE = ({ els, style }) => {
    // get the catalog from the server
    const { catalog } = useLazyLoadQuery(isceQuery)

    // paint my trays
    return (
        <>
            <Products els={els} specifications={catalog.specifications} style={style} />
            <Factories els={els} producers={catalog.producers} style={style} />
        </>
    )
}


// the query text
const isceQuery = graphql`query isceQuery {
    catalog(package: "flocor.isce") {
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
