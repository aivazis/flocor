// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'

// project
// i'm a tray
import { Tray } from '~/widgets'
// of nodes
import { Node } from '~/trays'
// that are factories
import { Factory } from '~/shapes'
// styles
import styles from './styles'


// a tray with a flow node
export const Calc = ({ style }) => {

    // placeholders for the factory metadata
    const factory = {
        schema: "pyre.calc.plus",
        category: "operators",
    }

    // build a graphical representation of my items:
    // pick a size for my unit cell
    const size = 24

    // turn it into a box
    const box = { x: 4 * size, y: 3 * size }
    // build the transform to resize my shape; don't forget that the diagram shapes are rendered
    // assuming a quarter cell grid, which means that they occupy the box ((-1,-1), (1,1)) in
    // their intrinsic coordinates
    const shrink = `scale(${size / 2}) translate(3 3)`
    // mix my paint
    const nodeStyle = { ...styles.node, ...style?.node }
    const shapeStyle = { ...styles.shape, ...style?.shape }

    // my factory's inputs
    const inputs = [
        { label: "op1", family: "", bound: false },
        { label: "op2", family: "", bound: false },
    ]
    // and outputs
    const outputs = [
        { label: "value", family: "", bound: false },
    ]

    // draw my shape
    const shape = (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
            width={box.x} height={box.y} style={nodeStyle}>
            <g transform={shrink}>
                <Factory inputs={inputs} outputs={outputs} style={shapeStyle} />
            </g>
        </svg>
    )


    // paint me
    return (
        <Tray title="calc operators" >
            <Node key={factory.schema}
                category={factory.category} family={factory.schema}
                shape={shape} size={box} />
        </Tray >
    )
}


// end of file
