// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
// context
import { Context } from './context'


// callback factory that binds the moving node mutator to a given node
export const useSetSelection = (node) => {
    // grab the relevant part of the context
    const { setSelection } = React.useContext(Context)

    // make an {onclick} callback that will place {node} on the pile of selected nodes
    const register = (evt) => {
        // stop this event from bubbling up; the intent here is to select nodes when they
        // are clicked, and clear the selection when the user clicks on empty space, i.e. the
        // parent {svg} element. this implies that there will be nested handlers for the {click}
        // and only the one attached the closest enclosing element should fire
        evt.stopPropagation()

        // if this is <shift+click>
        if (evt.shiftKey) {
            // add the {node} that was clicked to the selection pile
            setSelection(prev => {
                // check whether {node} is already in the selection
                const idx = prev.indexOf(node)
                // if it's not there
                if (idx == -1) {
                    // add it and return the new selection
                    return [...prev, node]
                }
                // if it is already selected, remove it
                return prev.filter(entry => entry != node)
            })
            // all done
            return
        }

        // otherwise, just replace the current selection with this node
        setSelection([node])
        // all done
        return
    }

    return register
}


// end of file
