// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'

// locals
// hooks
import { useEvent } from '~/hooks'
// styles
import styles from './styles'


// a tray with a flow node
const tray = ({ title, style, children }) => {
    // mix my paint
    const boxStyle = { ...styles.box, ...style?.box }
    const titleStyle = { ...styles.title, ...style?.title }
    const itemsStyle = { ...styles.items, ...style?.items }

    // paint me
    return (
        <section style={boxStyle}>
            <div style={titleStyle}>{title}</div>
            <div style={itemsStyle}>
                {children}
            </div>
        </section>
    )
}


// publish
export default tray


// end of file
