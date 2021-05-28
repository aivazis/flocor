// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'

// project
// i'm a tray
import { Tray } from '~/widgets'
// of nodes that are factories
import { Factory } from '~/trays'
// locals
// styles
import styles from './styles'


// a tray with factory nodes
export const Operators = ({ els, producers, style }) => {
    // paint me
    return (
        <Tray title="calc operators" >
            {producers.map(operator => (
                <Factory key={operator.family} factory={operator} els={els} style={style} />
            ))}
        </Tray >
    )
}


// end of file
