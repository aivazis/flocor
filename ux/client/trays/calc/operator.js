// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// project
// i'm a factory
import { Factory } from '~/trays'
// hooks
import { useCreateOperator } from './useCreateOperator'
// styles
import styles from './styles'


// a tray with factory nodes
export const Operator = ({ operator, els, style }) => {
    // buld the item selector
    const selector = useCreateOperator(operator)
    // paint
    return (
        <Factory selector={selector} factory={operator} els={els} style={style} />
    )
}


// end of file
