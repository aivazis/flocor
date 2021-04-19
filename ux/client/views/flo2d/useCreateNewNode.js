// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
// context
import { Context } from './context'


// callback factory that binds the new node mutator to a given node
export const useCreateNewNode = (flow) => {
    // grab the registered node from the context
    const { newNode } = React.useContext(Context)

    // make an event handler that adds a new node to the diagram
    const createNode = (position) => {
        // if there is no registered node info
        if (newNode === null) {
            // not much to do
            return
        }

        // otherwise, extract the mutator from the node info
        const { mutator } = newNode
        // and invoke it
        mutator(flow, position)
        // all done
        return
    }

    // and return the node info and the mutator
    return { newNode, createNode }
}


// end of file
