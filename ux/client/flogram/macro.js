// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
import { graphql, useFragment } from 'react-relay/hooks'
// project
import { Product } from '~/shapes'
// local
import { Node } from './node'


// render the flow nodes that are macros
export const Macro = (props) => {
    const macro = useFragment(graphql`
        fragment macro_macro on Macro {
            id
            name
            family
            position {
                x
                y
            }
        }
    `, props.macro)

    // render
    return (
        <Node id={macro.id} position={macro.position} >
            <Product />
        </Node>
    )
}


// end of file