// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
import styles from './styles'


// the hammer
const hammer = `
M 125.11742 922.1079
L 625.4769 421.74107
L 547.80444 341.28915
L 50 848.9388 Z M 468.2333 85.32646
C 522.4234 100.88144 598.3806 129.76216 621.90065 173.85167
C 624.5687 178.85456 624.1398 184.94276 620.79674 189.5222
L 548.8366 287.98934
L 671.6373 412.5685
C 673.2404 413.23537 674.507 414.5202 675.1509 416.1326
L 679.3883 420.4309
L 800.0479 412.51636
C 804.4635 412.2278 808.7761 413.9327 811.8007 417.1626
C 814.7972 420.4072 816.2119 424.8072 815.6679 429.19016
L 806.267 500.62356
L 838.539 528.28454
L 950 416.8235
L 923.695 390.5256
L 850.4511 390.5256
C 842.2906 390.5256 835.6753 383.91024 835.6753 375.74976
L 835.6753 258.3871
C 819.6937 230.05472 701.9054 38.12028 468.2333 85.32646
Z`


// render the shape
const shape = ({ style }) => {
    // mix my paint
    const ico = { ...styles.icon, ...style?.icon }

    // paint me
    return (
        <path d={hammer} style={ico} />
    )
}


// publish
export default shape


// end of file