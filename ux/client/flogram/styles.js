// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// get colors
import { wheel, theme } from '~/palette'
// get the base styles
import base from '~/views/styles'


// publish
export default {
    // the container
    panel: {
        // inherit
        ...base.panel,
    },

    canvas: {
        // occupy all available space
        width: "100%",
        height: "100%",
    },

    cell: {
        // stroke
        stroke: "hsl(0deg, 0%, 15%)",
        strokeWidth: "1",
        vectorEffect: "non-scaling-stroke",
        // fill
        fill: "none",
    },

    spot: {
        // stroke
        stroke: "none",
        vectorEffect: "non-scaling-stroke",
        // fill
        fill: "url(#gridGlow)",
    },

    // the binding lines
    binding: {
        // stroke
        stroke: "hsl(0deg, 0%, 35%)",
        strokeWidth: 2,
        vectorEffect: "non-scaling-stroke",
        // fill
        fill: "none",
    },
}


// end of file
