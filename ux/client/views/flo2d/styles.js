// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2020 all rights reserved


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
        // style
        // no smaller than
        minWidth: "600px",
        minHeight: "400px",
    },

    flex: {
        // the overall flex container
        box: {
            flex: "1 1 auto",
            backgroundColor: "hsl(0deg, 0%, 10%)",
        },

        // the inter-panel separator
        separator: {
            // the line
            rule: {
                backgroundColor: "hsl(0deg, 0%, 15%, 0.5)",
            },
            // the handle
            handle: {
            },
        },
    },

    activitybar: {
        // NYI
        // NOT STYLABLE FROM HERE AT THIS POINT
        // THE ActivityBar DOES NOT PARTICIPATE IN PAINT MIXING
    },

    // individual panels
    // the side bar
    sidebar: {
        panel: {
            // default sizing
            flex: "0 0 300px",
        },
    },

    // the main area
    canvas: {
        panel: {
        },
    },
}


// end of file
