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
        // fonts
        fontFamily: "inconsolata",
        fontSize: "75%",
        // sizes
        padding: "0.0rem 0.0rem 0.0rem 0.5rem",
        // for my children
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // highlight
        // border: "1px solid hsl(0deg, 0%, 30%)",
    },

    // the trait family name
    family: {
        userSelect: "none"
    },

    // state dependent styling
    state: {
        //
        normal: {
        },
        // highlighted
        highlighted: {
            color: "hsl(0deg, 0%, 80%)",
            backgroundColor: "hsl(0deg, 0%, 21%, 0.5)",
        },
    },
}


// end of file
