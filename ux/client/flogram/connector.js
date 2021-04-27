// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useFragment } from 'react-relay/hooks'
// local
import styles from './styles'


// render the onnectors between factories and products
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
            productAt {
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
    // and the product coordinates
    const productAt = connector.productAt

    // handle inputs vs. ooutputs
    const delta = inp ? -1 : 1
    // compute the connector path
    const path = `
        M ${factoryAt.x + delta} ${factoryAt.y}
        L ${productAt.x - delta} ${productAt.y}
        L ${productAt.x} ${productAt.y}
        `

    // mix my paint
    const connectorStyle = { ...styles.connector, ...props.style }
    // render
    return (
        <path d={path} style={connectorStyle} />
    )
}


// end of file