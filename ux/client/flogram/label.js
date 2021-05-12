// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useFragment } from 'react-relay/hooks'
// local
import styles from './styles'


// render the labels between factories and slots
export const Label = (props) => {
    // pull the data
    const label = useFragment(graphql`
        fragment label_label on Label {
            id
            value
            category
            position {
                x
                y
            }
        }
    `, props.label)

    // unpack
    const { value, category, position } = label
    // mix the paint
    const labelStyle = { ...styles.labels[category], ...props?.style?.labels[category] }
    // render
    return (
        <text x={position.x} y={position.y} style={labelStyle}>{value.join(", ")}</text>
    )
}


// end of file