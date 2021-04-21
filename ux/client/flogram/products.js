// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useFragment } from 'react-relay/hooks'
// local
import { Product } from './product'


// render the flow nodes that are products
export const Products = ({ flow }) => {
    // extract the list of products
    const { products } = useFragment(productsFragment, flow)
    // render
    return (
        <>
            {
                products.edges.map(edge => (
                    <Product key={edge.node.id} product={edge.node} />
                ))
            }
        </>
    )
}


//  the query fragment that fetches products
const productsFragment = graphql`
    fragment products_flow on Flow {
        products(first: 10000) @connection(key: "productsFragment_products") {
            edges {
                node {
                    id
                    ...product_product
                }
                cursor
            }
        }
    }
`

// end of file