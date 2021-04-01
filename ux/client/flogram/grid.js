// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'

// project
// hooks
import { useCamera } from '~/widgets/camera'
// local
import styles from './styles'


// highlight the grid cell that's under the cursor
// N.B.: this component renders whenever either the cursor position or the camera changes
//       on mouse move, we highlight the current cell
//       on camera changes, we hide the highlight; it will show up next time the cursor moves
export const Grid = () => {
    // set aside some storage so we can remember the previous values
    const ref = React.useRef(null)
    // get the current camera and cursor position
    const { camera, cursorPosition } = useCamera()
    // get the camera setting from our last render
    const prevCamera = ref.current
    // decide whether we should highlight the current cell
    const highlight = (cursorPosition !== null) && (camera === prevCamera)
    // record the new camera settings
    ref.current = camera

    // show me
    console.log(highlight)
    // if we are not highlighting
    if (highlight == false) {
        // there is nothing to render
        // return null
        return (
            <circle cx={x} cy={y} r=".3" style={styles.spot} />
        )
    }

    // otherwise, unpack the cursor location
    const { x, y } = cursorPosition

    // and make a mark
    // this one is a rectangle highlighting the current cell
    return (
        <rect x={x - 0.5} y={y - 0.5} width={1} height={1} style={styles.cell} />
    )

    // this is a dot at the center of the current cell
    // return (
    //     <circle cx={x} cy={y} r=".3" style={styles.spot} />
    // )
}


// end of file