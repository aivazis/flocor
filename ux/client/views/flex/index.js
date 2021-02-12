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
    // set up the size hints for my panels
    const columns = [
        // panel 0
        [60, 100],
        // panel 1
        [90, Infinity],
        // panel 2
        [120, 200],
        // panel 3
        [150, 300],
        // panel 4
        [180, Infinity],
        ]

    const rows = [
        // panel A
        [40, 180],
        // panel B
        [60, 220],
        // panel C
        [100, Infinity],
    ]

    // build the rep
    return (
        <section style={styles.panel} >
            <Banner text="top" />

            <Flex direction="row" hints={columns} style={styles.flex} >
                <Item>panel 0</Item>
                <Item>panel 1</Item>
                <Flex debug={true} direction="column" hints={rows} style={styles.flex} >
                    <Item>panel A</Item>
                    <Item>panel B</Item>
                    <Item>panel C</Item>
                </Flex>
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
