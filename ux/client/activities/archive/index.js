// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { Link } from 'react-router-dom'

// locals
// widgets
import { Activity } from '~/activities'
// my shape
import { Archive } from '~/shapes'
// styles
import styles from './styles'


// manage the data archive
const activity = ({ size=32, style }) => {
    // mix my paint
    const activityStyle = {
        // for the badge
        badge: { ...styles.badge, ...style?.badge },
        // for the shape
        shape: { ...styles.shape, ...style?.shape },
    }

    // paint me
    return (
        <Activity size={size} url="/archive" style={activityStyle} >
            <Archive />
        </Activity >
    )
}


// publish
export default activity


// end of file