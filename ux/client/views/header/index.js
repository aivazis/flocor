// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Kill } from '~/widgets'
// locals
import styles from './styles'


// the top bar
const header = () => {
    // tie the visibility of header elements to my state
    const [visibility, setVisibility] = useState("visible")
    // make a function that sets the visibility to {hidden}; we will hand this to the {kill} widget
    const hide = () => setVisibility("hidden")

    // get the {nav} style and adjust the visibility of its container
    var navStyle = {...styles.nav.box, visibility}
    // get the {kill} widget styling
    var killStyle = {...styles.kill}
    // and adjust the visibility of its container as well
    killStyle.box.visibility = visibility

    // get the current page
    const location = useLocation().pathname

    // assemble the style for the link
    const decorate = name => (
        location.startsWith('/' + name) ?
        {...styles.nav.name, ...styles.nav.current} : styles.nav.name
    )

    // the table of page links
    const links = [
        ]

    // build the component and return it
    return (
        // the container
        <header style={styles.header}>
            {/* the application name */}
            <div style={styles.app}>
                flocor
            </div>

            {/* the menu */}
            <nav style={navStyle}>
                {links.map( (link, index) => {
                     // link styling
                     const linkStyle = (
                         (index === links.length-1)
                         ? {...styles.nav.link, ...styles.nav.last}
                         : styles.nav.link )
                     // entry styling
                     const entryStyle = decorate(link.name)
                     // render
                     return (
                         <Link key={link.name} to={link.name} style={linkStyle}>
                             <span style={entryStyle} title={link.title}>
                                 {link.name}
                             </span>
                         </Link>
                     )}
                 )}
            </nav>

            {/* the kill button */}
            <Kill style={killStyle} onKill={hide} transform="scale(0.2 0.2)"/>

        </header>
    )
}


// publish
export default header


// end of file
