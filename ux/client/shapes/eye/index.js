// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
import React from 'react'
// locals
import styles from './styles'


// the question mark
const eye = `
M 938.5267 485.6202
C 930.5555 475.928 740.448 248.0255 499.97735 248.0255
C 259.50668 248.0255 69.44449 475.928 61.473336 485.6202
L 49.65248 500
L 61.473336 514.3798
C 69.44449 524.0946 259.50668 751.9745 499.97735 751.9745
C 740.448 751.9745 930.5555 524.0946 938.5267 514.4024
L 950.3475 500.02265 Z M 499.97735 706.68386
C 314.24042 706.68386 154.45503 549.0724 109.23232 500.02265
C 154.47767 450.95023 314.24042 293.3388 499.97735 293.3388
C 685.7369 293.3388 845.5676 450.9729 890.7903 500.02265
C 845.6356 549.09506 686.0766 706.68386 499.97735 706.68386
Z
M 499.97735 335.9573
C 409.5093 335.9573 335.93464 409.5546 335.93464 500
C 335.93464 590.4454 409.53194 664.0427 499.97735 664.0427
C 590.4228 664.0427 664.0201 590.4454 664.0201 500
C 664.0201 409.5546 590.4228 335.9573 499.97735 335.9573 Z M 499.97735 618.7521
C 434.4871 618.7521 381.2253 565.4676 381.2253 500
C 381.2253 434.53237 434.50973 381.24793 499.97735 381.24793
C 565.445 381.24793 618.7294 434.53237 618.7294 500
C 618.7294 565.4676 565.4676 618.7521 499.97735 618.7521
Z
`


// render the shape
const shape = ({ style }) => {
    // mix my paint
    const ico = { ...styles.icon, ...style?.icon }

    // paint me
    return (
        <>
            <path style={ico} d={eye} />
            <circle style={ico}
                    cx="499.97735" cy="500" r="70.8347164120654" />
            </>
    )
}


// publish
export default shape


// end of file