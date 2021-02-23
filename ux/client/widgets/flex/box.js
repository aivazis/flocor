// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'

// locals
// hooks
import { useEvent } from '~/hooks'
// context
import { Provider, useFlex } from './context'
// hooks
import useDirection from './useDirection'
// styles
import styles from './styles'


const Box = ({ style, children }) => {
    // get the flexbox direction
    const { direction } = useDirection()
    // get the flex support
    const { flexingPanel, separatorLocation, doFlex, endFlex } = useFlex()

    // make an event handler for {doFlex}
    const onFlex = (evt) => {
        // stop this event from bubbling up
        evt.stopPropagation()
        // an quash any side effects
        evt.preventDefault()
        // invoke the flex handler
        doFlex({ x: evt.clientX, y: evt.clientY })
        // all done
        return
    }

    // make an event handler for {beginFlex}
    const onEndFlex = (evt) => {
        // stop this event from bubbling up
        evt.stopPropagation()
        // an quash any side effects
        evt.preventDefault()
        // invoke the flex handler
        endFlex()
        // all done
        return
    }

    // make a ref for my container
    const ref = React.useRef(null)
    // install our event listeners
    useEvent({ name: "mouseup", listener: onEndFlex, client: ref })
    useEvent({ name: "mouseleave", listener: onEndFlex, client: ref })
    useEvent({
        name: "mousemove", listener: onFlex, client: ref,
        triggers: [flexingPanel, separatorLocation]
    })

    // mix my paint
    const boxStyle = { ...styles.box, ...style?.box, flexDirection: direction }

    // paint me
    return (
        <div ref={ref} style={boxStyle}>
            {children}
        </div>
    )
}


// turn flex into a context provider and publish
export default ({ direction, ...rest }) => {
    // set up the context provider
    return (
        <Provider direction={direction} >
            <Box {...rest} />
        </Provider >
    )
}


// end of file
