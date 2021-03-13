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

}


// end of file
