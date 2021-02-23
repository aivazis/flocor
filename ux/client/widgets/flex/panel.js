// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'

// locals
// hooks
import { useResizeObserver } from '~/hooks'
// context
import { useDirection, useExtent, useRegisterPanel } from './context'
// my separator
import Separator from './separator'
// styles
import styles from './styles'

// a container for client children
const panel = ({ min = 0, max = Infinity, style, children, debug }) => {
    // make a ref for my contents
    const ref = React.useRef(null)
    // get the direction dependent extent names
    const { minExtent, maxExtent } = useExtent()

    // register this panel
    const flexingProps = useRegisterPanel(ref, min, max)

    // storage for the size dependent styling
    let sizeStyle = {}
    // if i have a minimum size
    if (min > 0) {
        // attach it to my style object; make the units explicit so there is no confusion
        sizeStyle[minExtent] = `${min}px`
    }
    // if i have a maximum size
    if (max < Infinity) {
        // attach it to my style object; make the units explicit so there is no confusion
        sizeStyle[maxExtent] = `${max}px`
    }

    // mix my paint
    const panelStyle = { ...styles.panel, ...sizeStyle, ...style?.panel }

    // during normal execution, my content is my {children}
    let content = children
    // however, in debugging mode
    if (debug) {
        // get my extent
        const { extent } = useResizeObserver({ ref })
        // and render it as my content
        content = <span>{extent.width}x{extent.height}</span>
    }

    // paint me
    return (
        <>
            <div ref={ref} style={panelStyle} >
                {content}
            </div>
            <Separator {...flexingProps} style={style.separator} />
        </>
    )
}


// publish
export default panel


// end of file
