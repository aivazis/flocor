// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'

// project
// i'm a factory
import { Factory } from '~/trays'
// grab the new node context management gooks
import { useSetNewNode } from '~/views/flo2d'
// locals
// styles
import styles from './styles'


// a tray with factory nodes
export const Operator = ({ operator, els, style }) => {
    // info
    const info = operator.family
    // the mutator
    const mutator = (flow, position) => {
        // unpack the position
        const { x, y } = position
        // say something
        console.log(`flow '${flow}': adding '${operator.family}' at (${x}, ${y})`)
    }
    // install
    const selector = useSetNewNode({ info, mutator })
    // paint
    return (
        <Factory selector={selector} factory={operator} els={els} style={style} />
    )
}


// end of file
