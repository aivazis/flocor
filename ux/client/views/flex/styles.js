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
        // styling
        overflow: "clip",
        margin: "0.5rem",

        // for my children: flow is already established by {base}
        flexDirection: "column",

        // fonts
        fontFamily: "inconsolata",
        fontSize: "60%",
    },

    before: {
        flex: "0 0 2em",
        backgroundColor: "hsl(0deg, 20%, 10%)",

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    after: {
        flex: "0 0 2em",
        backgroundColor: "hsl(0deg, 20%, 10%)",

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    flex: {
        // the overall flex container
        box: {
        },

        // individual panels
        panel: {
            flex: "0 0 100px",
            height: "200px",
            overflow: "hidden",
            backgroundColor: "hsl(0deg, 0%, 5%, 1)",
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
}


// end of file
