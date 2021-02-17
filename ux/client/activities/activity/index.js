// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

// locals
// widgets
import { Badge } from '~/widgets'
// styles
import styles from './styles'


// kill the server
const activity = ({ size=32, url, children, style }) => {
    // get the current location
    const location = useLocation().pathname

    // if this the currently active page, mix a highlight
    const highlight = location.startsWith(url) ?
                      { ...styles.active, ...style?.active } :
                      {}

    // mix my paint
    const activityStyle = {
        // for the badge
        badge: {
            // the explict styling
            ...styles.badge, ...style?.badge,
            // and the highlight
            ...highlight,
        },

        // for the shape
        shape: { ...styles.shape, ...style?.shape },
    }

    // paint me
    return (
        <Link to={url} >
            <Badge size={size} style={activityStyle} >
                {children}
            </Badge >
        </Link >
    )
}


// publish
export default activity


// end of file
