// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React  from 'react'

// locals
// hooks
import { useResizeObserver } from '~/hooks'
// styles
import styles from './styles'

// a container for client children
const panel = React.forwardRef(({idx, isRow, isReversed, hint, style, children, debug}, ref) => {

    // unpack the hint
    const [minSize, maxSize] = hint

    // storage for the size dependent styling
    let sizeStyle = {}
    // for horizontal layouts
    if (isRow) {
        // if i have a minimum size
        if (minSize > 0) {
            // set the minimum width
            sizeStyle["minWidth"] = minSize
        }
        // if i have a maximum size
        if (maxSize < Infinity) {
            // set the minimum width
            sizeStyle["maxWidth"] = maxSize
        }
    } else {
        // if i have a minimum size
        if (minSize > 0) {
            // set the minimum height
            sizeStyle["minHeight"] = minSize
        }
        // if i have a maximum size
        if (maxSize < Infinity) {
            // set the minimum height
            sizeStyle["maxHeight"] = maxSize
        }
    }

    // mix my styles
    const panelStyle = { ...styles.panel, ...sizeStyle, ...style }

    // during normal execution, my content is my {children}
    let content = children
    // however, in debugging mode
    if (debug) {
        // get my extent
        const { extent } = useResizeObserver({ref})
        // and render it as my content
        content = <span>{extent.width}x{extent.height}</span>
    }

    // paint me
    return (
        <div ref={ref} style={panelStyle} >
            {content}
        </div>
    )
})


// publish
export default panel


// end of file