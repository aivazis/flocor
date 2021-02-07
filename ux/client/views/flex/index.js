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


// the hex sandbox
const Panel = () => {
    // listent to resize events
    // const {ref: refBefore, extent: extentBefore} = useResizeObserver()
    // const {ref: refAfter, extent: extentAfter} = useResizeObserver()


    // increase the height of an element by a fixed number of pixels
    const grow = ({target}) => {
        // get the height
        const { height } = target.getBoundingClientRect()
        // adjust and set
        target.style.flexBasis = `${height + 20}px`
        // all done
        return
    }

    // show me the event location
    const showme = ({clientX, clientY}) => {
        console.log(`click at ${clientX}x${clientY}`)
    }

    // drag start
    const dstart = ({clientX, clientY}) => {
        console.log(`drag start at ${clientX}x${clientY}`)
    }

    const dend = ({clientX, clientY}) => {
        console.log(`drag end at ${clientX}x${clientY}`)
    }

    const denter = ({target}) => {
        target.style.backgroundColor = "hsl(0deg, 20%, 10%)"
    }

    const dleave = ({target}) => {
        target.style.backgroundColor = ""
    }

    // the set of panel controllers
    const panelControls = {
        onClick: grow,
        onDragEnd: dend,
        onDragEnter: denter,
        onDragLeave: dleave,
    }

    // the set of separator controllers
    const sepControls = {
        onDragStart: dstart,
    }

    // build the container and return it
    return (
        <section style={styles.panel} >
            <div style={styles.before}></div>


            <div style={styles.wrapper}>
                <div style={styles.item1} {...panelControls}></div>
                <div draggable={true} style={styles.separator} {...sepControls} />
                <div style={styles.item2} {...panelControls}></div>
                <div style={styles.separator} {...sepControls} />
                <div style={styles.item3} {...panelControls}></div>
            </div >

            <div style={styles.after}></div>
        </section>
    )
}


// publish
export default Panel

// end of file
