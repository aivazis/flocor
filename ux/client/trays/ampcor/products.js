// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// project
// i am a tray
import { Tray } from '~/widgets'
// of nodes that are products
import { Product } from '~/trays'
// locals
// styles
import styles from './styles'


// a tray with product nodes
export const Products = ({ els, specifications, style }) => {
    // paint me
    return (
        <Tray title="ampcor products" >
            {specifications.map(product => (
                <Product key={product.family} product={product} els={els} style={style} />
            ))}
        </Tray >
    )
}


// end of file
