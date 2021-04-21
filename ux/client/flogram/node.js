// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'

// local
// hooks
import { useSetMovingNode } from './useSetMovingNode'


// position a node on  the diagram and add its behavior
export const Node = ({ id, position, children }) => {
    // unpack the position of the node
    const { x, y } = position
    // build the positioning transform
    const xform = `translate(${x} ${y})`

    // make a callback that marks me as a candidate for moving
    const maybeMoveNode = useSetMovingNode(id)

    // when i'm clicked
    const select = () => {
        // mark me as a candidate for movement
        maybeMoveNode()
        // all done
        return
    }

    // node controls
    const nodeControls = {
        onMouseDown: select,
    }

    // render
    return (
        <g transform={xform} {...nodeControls} >
            {children}
        </g>
    )
}


// end of file