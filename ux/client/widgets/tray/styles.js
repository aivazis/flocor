// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// get colors
import { theme } from '~/palette'


// publish
export default {
    // the overall container
    box: {
    },

    // the tray header
    header: {
        // style
        fontSize: "60%",
        padding: "0.25rem 0.0rem 0.25rem 0.75rem",
        // colors
        color: "hsl(0deg, 0%, 80%, 1)",
        backgroundColor: "hsl(0deg, 0%, 31%, 1)",

        // for my children
        display: "flex",
        alignItems: "center",
    },

    // the tray title
    title: {
        // style
        fontFamily: "rubik",
        textTransform: "uppercase",
        padding: "0.0rem 0.0rem 0.0rem 0.5rem",
    },

    // the container of the children
    items: {
    },
}


// end of file
