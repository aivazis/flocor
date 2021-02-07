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
    // paint me
    return (
        <div style={style}>
            :{text}
        </div>
    )
}


const Panel = React.forwardRef(({idx, style, children}, ref) => {
    // watch my size
    const { extent } = useResizeObserver({ref})
    // paint me
    return (
        <div ref={ref} style={style}>
            <span>
                {idx}: {Math.round(extent.height)}x{Math.round(extent.width)}
            </span>
            {children}
        </div>
    )
})


const Wrapper = ({style, children}) => {
    // if i have no children
    if (children === undefined) {
        // there's nothing to do
        return null
    }

    // if i only have one child
    if (!Array.isArray(children)) {
        // nothing to do
        return children
    }

    // build and install the upport for the resizing behavior
    // keep track of the active separator
    const activeSeparator = React.useRef(inactiveSeparator)

    // resizing starts when a separator is clicked
    // save the separator id and the coordinates of the mouse
    const start = ({separator, x, y}) => {
        // save the event data
        activeSeparator.current = {separator, x, y}
        // show me
        console.log(`sep ${separator}: start at ${x}x${y}`)
        // all done
        return
    }

    // resizing ends under a variety of conditions, such as the mouse being released
    const end = () => {
        // upack the current state
        const { separator, x, y } = activeSeparator.current

        // if we have an active separator
        if (separator) {
            // show me
            console.log(`sep ${separator}: end at ${x}x${y}`)
            // and reset the saved state
            activeSeparator.current = inactiveSeparator
        }

        // all done
        return
    }

    // resizing happens as the mouse moves
    const drag = (evt) => {
        // get the active separator
        const { separator } = activeSeparator.current
        // if we don't have one
        if (!separator) {
            // bail
            return
        }

        // this event is handled here
        evt.stopPropagation()
        // and should hav eno side effects
        evt.preventDefault()

        // build the new state
        const updatedState = { separator, x: evt.clientX, y: evt.clientY }
        // and attach it
        activeSeparator.current = updatedState
        // all done
        return
    }

    // assemble the separator controls
    const separatorControls = {
        start
    }

    // a ref for the wrapper
    const wrapperRef = React.useRef()
    // install our event listeners on the wrapper
    useEvent({name: "mouseleave", handler: end, client: wrapperRef})
    useEvent({name: "mousemove", handler: drag, client: wrapperRef})
    useEvent({name: "mouseup", handler: end, client: wrapperRef})

    // storaget for my content
    const contents = new Array()
    // and the refs to my panels
    const refs = new Array()

    // go through my children
    children.forEach((child, idx) => {
        // everybody except the first element
        if (idx != 0) {
            // is preceded by a separator
            const sep = <Separator key={`sep.${idx-1}`} idx={idx-1}
                                   style={style.separator} controls={separatorControls} />
            // add it to the pile
            contents.push(sep)
        }
        // make a ref for this child
        const ref = React.useRef()
        // add it to the pile
        refs.push(ref)
        // every child is placed in a panel
        const panel = (
            <Panel ref={ref} key={`panel.${idx}`} idx={idx} style={style.panel} >
                {child}
            </Panel>
        )
        // add it to the pile
        contents.push(panel)
    })

    // paint me
    return (
        <div ref={wrapperRef} style={style.wrapper}>
            {contents}
        </div >
    )

}


const Separator = ({idx, style, controls}) => {
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

    // on click
    const onMouseDown = (evt) => {
        // stop this event from bubbling up
        evt.stopPropagation()
        // let the flex wrapper know that i was clicked
        controls?.start?.({separator: idx, x: evt.clientX, y: evt.clientY})
        // all done
        return
    }

    // assemble the handle controls
    const handleControls = {
        onMouseEnter,
        onMouseLeave,
        onMouseDown,
    }

    // paint me
    return (
        <div style={style.rule} >
            <div ref={ref} style={style.handle} {...handleControls} />
        </div>
    )
}


// the null active separator
const inactiveSeparator = {
    separator: null,
    x: 0,
    y: 0,
}


// the flex sandbox
const flex = () => {
    // build the rep
    return (
        <section style={styles.panel} >

            <Banner style={styles.before} text="top" />

            <Wrapper style={styles.flex}>
                <div>panel 0</div>
                <div>panel 1</div>
                <div>panel 2</div>
                <div>panel 3</div>
            </Wrapper >

            <Banner style={styles.after} text="bottom" />

        </section>
    )
}


// publish
export default flex

// end of file
