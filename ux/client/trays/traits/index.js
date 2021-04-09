// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'

// locals
// i am a tray
import { Tray } from '~/widgets'
// of nodes
import { Node } from '~/trays'
// that are products
import { Product } from '~/shapes'
// styles
import styles from './styles'


// a tray with a flow node
export const Traits = ({ style }) => {
    // get the set of basic traits from the server
    const { traits } = useLazyLoadQuery(traitsQuery)

    // build a graphical representation of my items:
    // pick a size for my icon
    const size = 24
    // turn it into a box
    const box = { x: size, y: size }
    // build the transform to resize my shape; don't forget that the diagram shapes are rendered
    // assuming a quarter cell grid, which means that they occupy the box ((-1,-1), (1,1)) in
    // their intrinsic coordinates
    const shrink = `scale(${size / 2}) translate(1 1)`
    // mix my paint
    const nodeStyle = { ...styles.node, ...style?.node }
    const shapeStyle = { ...styles.shape, ...style?.shape }
    // draw my shape
    const shape = (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
            width={box.x} height={box.y} style={nodeStyle}>
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


// the query text
const traitsQuery = graphql`query traitsQuery {
    traits {
        category
        schema
    }
}`


// end of file
