// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'

// project
import { Item } from '~/trays'
// local
// hooks
import { useCreateFactory } from './useCreateFactory'
// my graphical representation
import { Shape } from './shape'
// styles
import styles from './styles'


// a tray item with a factory
export const Factory = ({ factory, els, style }) => {
    // build the item selector
    const selector = useCreateFactory(factory)

    // build the bounding box of the factory shape in grid cells
    const box = {
        x: 8,
        y: Math.max(6, 2 * Math.max(factory.inputs.length, factory.outputs.length)),
    }
    // in pixels, for sizing the {svg} viewport
    const width = els * box.x
    const height = els * box.y
    // for the cursor shadow offset
    const offset = box
    // build the transform to resize my shape; don't forget that the diagram
    // shapes are rendered assuming a quarter cell grid
    const place = `scale(${els}) translate(${box.x / 2} ${box.y / 2})`

    // splice the family name
    const levels = factory.family.split(".")
    // build the family label
    const family = levels[levels.length - 1]

    // mix my paint
    const nodeStyle = { ...styles.node, ...style?.node }
    // paint me
    return (
        <Item family={family} selector={selector} els={els} size={offset} >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                width={width} height={height} style={nodeStyle}>
                <g transform={place}>
                    <Shape factory={factory} style={style} />
                </g>
            </svg>
        </Item>
    )
}


// end of file
