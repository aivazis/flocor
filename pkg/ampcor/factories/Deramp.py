# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# superclass
from .Factory import Factory as factory


# compute the amplitude of the input signal arena
class Deramp(factory,
             family="flocor.ampcor.factories.dsp.deramp",
             implements=flocor.ampcor.protocols.dsp):
    """
    Deramp a complex arena of signal tiles
    """


    # inputs
    signal = flocor.ampcor.protocols.arena.input()
    signal.doc = "the input signal"

    # output
    result = flocor.ampcor.protocols.arena.output()
    result.doc = "the output signal"


# end of file
