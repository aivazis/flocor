// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'

// locals
// hooks
import { useEvent, useResizeObserver } from '~/hooks'
// widgets
import { Flex } from '~/widgets'
// styles
import styles from './styles'


const Banner = ({ style, text = "" }) => {
    // mix my styles
    const bannerStyle = { ...styles.banner, ...style }
    // paint me
    return (
        <div style={bannerStyle}>
            :{text}
        </div>
    )
}

const Item = ({ style, children }) => {
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

            <Flex.Box direction="row" style={styles.flex} >

                <Flex.Panel min={60} max={100} style={styles.flex} >
                    <Item>panel 0</Item >
                </Flex.Panel>

                <Flex.Panel min={90} max={Infinity} style={styles.flex} >
                    <Item>panel 1</Item>
                </Flex.Panel>

                <Flex.Panel min={120} max={200} style={styles.flex} >
                    <Flex.Box direction="column" style={styles.flex} >

                        <Flex.Panel min={40} max={180} style={styles.flex} >
                            <Item>panel A</Item>
                        </Flex.Panel>

                        <Flex.Panel min={60} max={220} style={styles.flex} >
                            <Item>panel B</Item>
                        </Flex.Panel>

                        <Flex.Panel min={100} max={Infinity} style={styles.flex} >
                            <Item>panel C</Item>
                        </Flex.Panel>

                    </Flex.Box>
                </Flex.Panel>

                <Flex.Panel min={150} max={300} style={styles.flex} >
                    <Item>panel 2</Item>
                </Flex.Panel>

                <Flex.Panel min={180} max={Infinity} style={styles.flex} >
                    <Item>panel 3</Item>
                </Flex.Panel>

            </Flex.Box>

            <Banner text="bottom" />
        </section>
    )
}


// publish
export default flex

// end of file
