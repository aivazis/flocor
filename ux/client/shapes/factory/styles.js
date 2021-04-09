// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// get colors
import { theme } from '~/palette'

// the base style
import style from '~/shapes/styles'


// the shape color
const ink = "hsl(28deg, 70%, 45%)"
const paint = "hsl(28deg, 70%, 25%)"

// publish
export default {
    // the main shape
    icon: {
        // inherit
        ...style.icon,
        // stroke
        stroke: ink,
        strokeWidth: 2,
        // fill
        fill: paint,
    },

    // decorative touches
    decoration: {
        // inherit
        ...style.decoration,
        // stroke
        stroke: "hsl(0deg, 0%, 50%)",
        strokeWidth: 1,
        // fill
        fill: "none",
    },

    // terminal marker
    terminal: {
        // inherit
        ...style.decoration,
        // stroke
        stroke: "hsl(0deg, 70%, 40%)",
        strokeWidth: 1,
        // fill
        fill: "hsl(0deg, 40%, 20%)",
    },
}


// end of file
