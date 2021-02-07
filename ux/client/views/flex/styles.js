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
        margin: "0.5em",

        // for my children: flow is already established by {base}
        flexDirection: "column",
    },

    before: {
        fontFamily: "inconsolata",
        fontSize: "60%",
        flex: "0 0 2em",
        backgroundColor: "hsl(0deg, 20%, 10%)",

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    after: {
        fontFamily: "inconsolata",
        fontSize: "60%",
        flex: "0 0 2em",
        backgroundColor: "hsl(0deg, 20%, 10%)",

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    flex: {
        panel: {
            flex: "1 1 10px",
            overflow: "hidden",
            backgroundColor: "hsl(0deg, 0%, 5%, 1)",
        },

        wrapper: {
            fontFamily: "inconsolata",
            fontSize: "60%",
            position: "relative",
            height: "100%",
            overflow: "clip",

            display: "flex",
            flexDirection: "column",
        },

        separator: {
            rule: {
                flex: "0 0 auto",
                overflow: "visible",
                height: "1px",
                backgroundColor: "hsl(0deg, 0%, 15%, 0.5)",
                cursor: "row-resize",
            },

            handle: {
                zIndex: 1,
                width: "100%",
                height: "11px",
                transform: "translate(0, -50%)",
            },

            colors: {
                hidden: "hsl(0deg, 0%, 15%, 0)",
                visible: "hsl(0deg, 0%, 15%, 0.5)",
            },
        },

    },
}


// end of file
