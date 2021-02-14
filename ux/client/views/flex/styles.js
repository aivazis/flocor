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
        margin: "1.0rem",

        // for my children: flow is already established by {base}
        flexDirection: "column",
        justifyContent: "space-between",

        // fonts
        fontFamily: "inconsolata",
        fontSize: "60%",
    },

    banner: {
        flex: "0 0 2em",
        backgroundColor: "hsl(0deg, 20%, 10%)",

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    item: {
        width: "100%",
        height: "100%",
        backgroundColor: "hsl(0deg, 0%, 7%)",
    },

    flex: {
        // the overall flex container
        box: {
            flex: "1 1 auto",
            backgroundColor: "hsl(0deg, 0%, 10%)",
        },

        // individual panels
        panel: {
            backgroundColor: "hsl(0deg, 100%, 5%, 1)",
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
