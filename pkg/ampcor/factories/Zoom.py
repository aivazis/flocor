# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# superclass
from .Factory import Factory as factory


# extend the shape of the tiles in an arena by a factor by using FFT
class Zoom(factory,
           family="flocor.ampcor.factories.dsp.zoom",
           implements=flocor.ampcor.protocols.dsp):
    """
    Extend the shape of the tiles in the input arena using FFTs
    """


    # inputs
    signal = flocor.ampcor.protocols.arena.input()
    signal.doc = "the input signal"

    # output
    result = flocor.ampcor.protocols.arena.output()
    result.doc = "the output signal"


# end of file
