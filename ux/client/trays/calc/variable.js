// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'

// project
// i'm a product
import { Product } from '~/trays'
// locals
// hooks
import { useCreateVariable } from './useCreateVariable'
// styles
import styles from './styles'


// a tray with factory nodes
export const Variable = ({ variable, els, style }) => {
    // build the item selector
    const selector = useCreateVariable(variable)
    // paint
    return (
        <Product selector={selector} product={variable} els={els} style={style} />
    )
}


// end of file
