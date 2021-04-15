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
// of nodes that are factories
import { Node, Factory } from '~/trays'
// styles
import styles from './styles'


// a tray with a flow node
export const Calc = ({ els, style }) => {
    // get the set of basic {calc} operators
    const { operators } = useLazyLoadQuery(calcQuery)

    // mix my paint
    const nodeStyle = { ...styles.node, ...style?.node }
    const shapeStyle = { ...styles.shape, ...style?.shape }

    // paint me
    return (
        <Tray title="calc operators" >
            {operators.map(op => {
                // build the bounding box of the factor shape in grid cells
                const box = {
                    x: 8,
                    y: Math.max(6, 2 * Math.max(op.inputs.length, op.outputs.length)),
                }
                // in pixels, for sizing the {svg} viewport
                const width = els * box.x
                const height = els * box.y
                // for the cursor shadow offset
                const offset = box
                // build the transform to resize my shape; don't forget that the diagram
                // shapes are rendered assuming a quarter cell grid
                const place = `scale(${els}) translate(${box.x / 2} ${box.y / 2})`
                // paint
                return (
                    <Node key={op.family} category={op.category} family={op.family}
                        els={els} size={offset} >
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                            width={width} height={height} style={nodeStyle}>
                            <g transform={place}>
                                <Factory factory={op} style={shapeStyle} />
                            </g>
                        </svg>
                    </Node>
                )
            })}
        </Tray>
    )
}


// the query string
const calcQuery = graphql`query calcQuery {
    operators {
        category
        family
        inputs
        outputs
    }
}
`

// end of file
