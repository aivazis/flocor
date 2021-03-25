// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'

// locals
// hooks
// i am a tray of nodes
import { Tray, Node } from '~/trays'
// that are products
import { Product } from '~/shapes'
// styles
import styles from './styles'


// a tray with a flow node
export const Traits = ({ style }) => {
    // get the set of basic traits from the server
    const { traits } = useLazyLoadQuery(
        graphql`query traitsQuery {
            traits {
                category
                schema
            }
        }`
    )

    // build a graphical representation of my items:
    // pick a size for my icon
    const size = 16
    // turn it into a box
    const box = { x: size, y: size }
    // build the transform to resize my shape
    const shrink = `scale(${size}) translate(0.5 0.5)`
    // mix my paint
    const nodeStyle = { ...styles.node, ...style?.node }
    const shapeStyle = { ...styles.shape, ...style?.shape }
    // draw my shape
    const shape = (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
            width={size} height={size} style={nodeStyle}>
            <g transform={shrink}>
                <Product style={shapeStyle} />
            </g>
        </svg>
    )

    // paint me
    return (
        <Tray title="pyre traits" >
            {traits.map(trait => (
                <Node key={trait.schema}
                    category={trait.category} family={trait.schema}
                    shape={shape} size={box} />
            ))}
        </Tray >
    )
}


// end of file
