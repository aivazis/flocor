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
    // the overall box
    box: {
        position: "relative",
        overflow: "clip",
        display: "flex",
        // orientation sensitive
        flexDirection: "column",
    },

    // the individual panels
    panel: {
        flex: "0 0 100px",
        overflow: "hidden",
        backgroundColor: "hsl(0deg, 0%, 5%, 1)",
    },

    // the inre-panel separator
    separator: {
        // the line
        rule: {
            flex: "0 0 auto",
            overflow: "visible",
            backgroundColor: "hsl(0deg, 0%, 15%, 0.5)",

            // orientation sensitive
            height: "1px",
            cursor: "row-resize",
        },

        // the handle
        handle: {
            zIndex: 1,
            // orientation sensitive
            width: "100%",
            height: "11px",
            transform: "translate(0, -50%)",
        },

        // state dependent styling
        colors: {
            hidden: "hsl(0deg, 0%, 15%, 0)",
            visible: "hsl(0deg, 0%, 15%, 0.5)",
        },
    },

}


// end of file
