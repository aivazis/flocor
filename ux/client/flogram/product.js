// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useFragment } from 'react-relay/hooks'
// project
import { Product as Shape } from '~/shapes'
// local
import { Node } from './node'


// render the flow nodes that are products
export const Product = (props) => {
    const product = useFragment(graphql`
        fragment product_product on Product {
            id
            position {
                x
                y
            }
        }
    `, props.product)

    // render
    return (
        <Node id={product.id} position={product.position} >
            <Shape />
        </Node>
    )
}


// end of file