// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'

// locals
// styles
import styles from './styles'


// a tray with a flow node
export const Tray = ({ title, style, children }) => {
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


// end of file
