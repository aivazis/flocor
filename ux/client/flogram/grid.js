// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'

// project
// hooks
import { useEvent } from '~/hooks'
import { useCamera } from '~/widgets/camera'
// local
import styles from './styles'


// render the flow nodes that are macros
export const Grid = React.forwardRef(({ }, viewRef) => {
    // make some room to store the diagram coordinates of the mouse cursor
    const [position, setPosition] = React.useState(null)
    // get the coordinate transform
    const { camera, toICS } = useCamera()

    // make a callback that displays the cursor position
    const track = (evt) => {
        // record the location
        setPosition(toICS(evt.clientX, evt.clientY))
        // all done
        return
    }
    // and one the clear the tracking of the cursor
    const clear = () => {
        // by setting the position to null
        setPosition(null)
        // all done
        return
    }

    // while the mouse is moving within my client's area
    useEvent({
        name: "mousemove", listener: track, client: viewRef,
        triggers: [camera]
    })
    // when it leaves
    useEvent({
        name: "mouseleave", listener: clear, client: viewRef,
        triggers: []
    })

    // if we don't have a record of where the cursor is
    if (position === null) {
        // there is nothing to render
        return null
    }

    // otherwise, unpack the cursor location
    const { x, y } = position

    // and make a mark
    return (
        <rect x={x - 0.5} y={y - 0.5} width={1} height={1} style={styles.cell} />
    )

    // return (
    // <circle cx={x} cy={y} r=".3" style={styles.spot} />
    // )
})


// end of file