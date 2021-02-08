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
    // paint me
    return (
        <div style={style}>
            :{text}
        </div>
    )
}


// the flex sandbox
const flex = () => {
    // build the rep
    return (
        <section style={styles.panel} >

            <Banner style={styles.before} text="top" />

            <Flex direction="column" style={styles.flex} >
                <div>panel 0</div>
                <div>panel 1</div>
                <Flex direction="row" style={styles.flex} >
                    <div>panel 2a</div>
                    <div>panel 2b</div>
                    <div>panel 2c</div>
                </Flex >
                <div>panel 3</div>
            </Flex >

            <Banner style={styles.after} text="bottom" />

        </section>
    )
}


// publish
export default flex

// end of file
