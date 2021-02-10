// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React  from 'react'

// locals
// hooks
import { useEvent, useResizeObserver } from '~/hooks'
// widgets
import { Flex } from '~/widgets'
// styles
import styles from './styles'


const Banner = ({style, text=""}) => {
    // mix my styles
    const bannerStyle = { ...styles.banner, ...style }
    // paint me
    return (
        <div style={bannerStyle}>
            :{text}
        </div>
    )
}

const Item = ({style, children}) => {
    // mix my style
    const panelStyle = { ...styles.item, ...style }

    // get my extent
    const { ref, extent } = useResizeObserver()

    // paint me
    return (
        <div ref={ref} style={panelStyle}>
            {extent.height}x{extent.width}
        </div>
    )
}


// the flex sandbox
const flex = () => {
    // build the rep
    return (
        <section style={styles.panel} >
            <Banner text="top" />

            <Flex direction="column" style={styles.flex} >
                <Item>panel 0</Item>
                <Item>panel 1</Item>
                <Item>panel 2</Item>
                <Item>panel 3</Item>
            </Flex>

            <Banner text="bottom" />
        </section>
    )
}


// publish
export default flex

// end of file
