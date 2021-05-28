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
export const Variables = ({ els, specifications, style }) => {
    // paint me
    return (
        <Tray title="calc variables" >
            {specifications.map(variable => (
                <Product key={variable.family} product={variable} els={els} style={style} />
            ))}
        </Tray >
    )
}


// end of file
