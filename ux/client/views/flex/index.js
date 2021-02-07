// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React  from 'react'

// locals
// hooks
import { useEvent, useResizeObserver } from '~/hooks'
// styles
import styles from './styles'


const Banner = ({style, text=""}) => {
    // make some state
    const resizing = React.useRef(false)
    // watch my size
    const {ref, extent} = useResizeObserver()
    // paint me
    return (
        <div ref={ref} style={style}>
            {extent.height}x{extent.width}{text ? `: ${text}` : ""}
        </div>
    )
}


const Panel = ({style}) => {
    // make some state
    const resizing = React.useRef(false)
    // watch my size
    const {ref, extent} = useResizeObserver()
    // paint me
    return (
        <div ref={ref} style={style}>
            {Math.round(extent.height)}x{Math.round(extent.width)}
        </div>
    )
}


const Separator = ({style, controls}) => {
    // make a ref for the handle
    const ref = React.useRef(null)

    // when the mouse enters my space
    const onMouseEnter = (evt) => {
        // stop this event from bubbling up
        evt.stopPropagation()
        // get the handle
        const handle = ref.current
        // if the handle has rendered
        if (handle) {
            // paint it
            handle.style.backgroundColor = style.colors.visible
        }
        // all done
        return
    }
    // when the mouse leaves my space
    const onMouseLeave = (evt) => {
        // stop this event from bubbling up
        evt.stopPropagation()
        // get the handle
        const handle = ref.current
        // if the handle has rendered
        if (handle) {
            // paint it
            handle.style.backgroundColor = style.colors.hidden
        }
        // all done
        return
    }

    // assemble the handle controls
    const handleControls = {
        onMouseEnter,
        onMouseLeave
    }

    // paint me
    return (
        <div style={style.rule} {...controls} >
            <div ref={ref} style={style.handle} {...handleControls} >
            </div>
        </div>
    )
}


// the hex sandbox
const view = () => {
    // a ref for the wrapper
    const wrapperRef = React.useRef()
    // a toggle
    const toggle = React.useRef(false)

    // log an event to the console
    const log = () => { console.log("log") }
    // log the start of a multi-event sequence
    const start = () => { console.log(`start: toggle: ${toggle.current}`) }
    // log the end of a multi-event sequence
    const end = () => { console.log(`end: toggle: ${toggle.current}`) ; toggle.current = false }
    // log a step in a multi-event sequence
    const step = () => { if (toggle.current) { console.log("step") } }
    // flip the toggle
    const flip = () => { toggle.current = !toggle.current; console.log("flip") }


    // install our event listeners on the wrapper
    useEvent({name: "mouseenter", handler: start, client: wrapperRef})
    useEvent({name: "mouseleave", handler: end, client: wrapperRef})
    useEvent({name: "mousemove", handler: step, client: wrapperRef})
    useEvent({name: "mouseup", handler: end, client: wrapperRef})


    // panel controls
    const panelControls = {
    }
    // separator controls
    const sepControls = {
        onMouseDown: flip,
    }

    // build the rep
    return (
        <section style={styles.panel} >

            <Banner style={styles.before} text="top" />

            <div ref={wrapperRef} style={styles.flex.wrapper}>
                <Panel style={styles.flex.panel} {...panelControls} />
                <Separator style={styles.flex.separator} controls={sepControls} />
                <Panel style={styles.flex.panel} {...panelControls} />
                <Separator style={styles.flex.separator} controls={sepControls} />
                <Panel style={styles.flex.panel} {...panelControls} />
            </div >

            <Banner style={styles.after} text="bottom" />
        </section>
    )
}


// publish
export default view

// end of file
