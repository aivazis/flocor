# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# superclass
from .Producer import Producer as producer
# protools
from .Arena import Arena as arena

# the protocol for signal processors
class DSP(producer, family="flocor.ampcor.factories.dsp"):
    """
    Modify an input signal
    """


    # inputs
    signal = arena.input()
    signal.doc = "the input signal"

    # output
    result = arena.output()
    result.doc = "the output signal"


# end of file
