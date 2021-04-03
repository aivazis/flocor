// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useFragment } from 'react-relay/hooks'
// local
import { Macro } from './macro'


// render the flow nodes that are macros
export const Macros = ({ nodes }) => {
    // specify what data we care about
    const macros = useFragment(macrosFragment, nodes)

    // render
    return (
        <>
            {
                macros.map(macro => (
                    <Macro key={macro.id} macro={macro} />
                ))
            }
        </>
    )
}


//  the query fragment that fetches macros
const macrosFragment = graphql`
    fragment macrosFragment_nodes on Macro @relay(plural:true) {
        id
        name
        family
        position {
            x
            y
        }
    }
`

// end of file