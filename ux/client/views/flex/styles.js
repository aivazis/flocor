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
        flex: "0 0 35px",
        backgroundColor: "hsl(0deg, 20%, 10%)",
    },

    after: {
        flex: "0 0 35px",
        backgroundColor: "hsl(0deg, 20%, 10%)",
    },

    flex: {
        position: "relative",
        height: "100%",
    },

    wrapper: {
        height: "100%",
        overflow: "clip",

        display: "flex",
        flexDirection: "column",
    },

    separator: {
        height: "2px",
        backgroundColor: "hsl(0deg, 0%, 35%)",
        cursor: "row-resize",
    },

    item1: {
        flex: "0 0 30px",
        overflow: "hidden",
        backgroundColor: "hsl(0deg, 0%, 10%)",
    },

    item2: {
        flex: 1,
        // flexBasis: "45px",
        overflow: "hidden",
        backgroundColor: "hsl(0deg, 0%, 10%)",
    },

    item3: {
        flex: "0 0 60px",
        overflow: "hidden",
        backgroundColor: "hsl(0deg, 0%, 10%)",
    },

}


// end of file
