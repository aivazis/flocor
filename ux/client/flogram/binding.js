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
export const Binding = (props) => {
    // pull the data
    const binding = useFragment(graphql`
        fragment binding_binding on Binding {
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
    `, props.binding)

    // unpack
    // the direction flag
    const inp = binding.inp
    // the factory diagram coordinates
    const factoryAt = binding.factoryAt
    // and the product coordinates
    const productAt = binding.productAt

    // handle inputs vs. ooutputs
    const delta = inp ? -1 : 1
    // compute the connector path
    const connector = `
        M ${factoryAt.x + delta} ${factoryAt.y}
        L ${productAt.x - delta} ${productAt.y}
        L ${productAt.x} ${productAt.y}
        `

    // mix my paint
    const bindingStyle = { ...styles.binding, ...props.style }
    // render
    return (
        <path d={connector} style={bindingStyle} />
    )
}


// end of file