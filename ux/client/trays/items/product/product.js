// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'

// project
import { Item } from '~/trays'
// local
import { Shape } from './shape'
// styles
import styles from './styles'


// a tray item with a factory
export const Product = ({ product, els, style }) => {
    // build the bounding box of the product shape in grid cells
    const box = { x: 2, y: 2 }
    // in pixels, for sizing the {svg} viewport
    const width = els * box.x
    const height = els * box.y
    // for the cursor shadow offset
    const offset = box
    // build the transform to resize my shape; don't forget that the diagram
    // shapes are rendered assuming a quarter cell grid
    const place = `scale(${els}) translate(${box.x / 2} ${box.y / 2})`

    // mix my paint
    const nodeStyle = { ...styles.node, ...style?.node }
    // paint me
    return (
        <Item family={product.family} els={els} size={offset} >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                width={width} height={height} style={nodeStyle}>
                <g transform={place}>
                    <Shape product={product} style={style} />
                </g>
            </svg>
        </Item>
    )
}


// end of file
