// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'

// project
import { useSetSelection } from '~/views/flo2d'
// local
import { useSetMovingNode } from './useSetMovingNode'


// position a node on  the diagram and add its behavior
export const Node = ({ id, position, children }) => {
    // unpack the position of the node
    const { x, y } = position
    // build the positioning transform
    const xform = `translate(${x} ${y})`

    //
    const select = useSetSelection(id)
    // mark me as a candidate for moving
    const embark = useSetMovingNode(id)

    // node controls
    const nodeControls = {
        onClick: select,
        onMouseDown: embark,
    }

    // render
    return (
        <g transform={xform} {...nodeControls} >
            {children}
        </g>
    )
}


// end of file