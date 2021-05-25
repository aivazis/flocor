// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useFragment } from 'react-relay/hooks'
// local
import styles from './styles'


// render the connectors between factories and slots
export const Connector = (props) => {
    // pull the data
    const connector = useFragment(graphql`
        fragment connector_connector on Connector {
            id
            inp
            factoryAt {
                x
                y
            }
            slotAt {
                x
                y
            }
        }
    `, props.connector)

    // unpack
    // the direction flag
    const inp = connector.inp
    // the factory diagram coordinates
    const factoryAt = connector.factoryAt
    // and the slot coordinates
    const slotAt = connector.slotAt

    // handle inputs vs. outputs
    const delta = 2 * (inp ? -1 : 1)
    // compute the connector path
    const path = `
        M ${factoryAt.x + delta} ${factoryAt.y}
        L ${slotAt.x - delta} ${slotAt.y}
        L ${slotAt.x} ${slotAt.y}
        `

    // mix my paint
    const connectorStyle = { ...styles.connector, ...props.style }
    // render
    return (
        <path d={path} style={connectorStyle} />
    )
}


// end of file