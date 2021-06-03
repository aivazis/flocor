# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# superclass
from .Factory import Factory as factory


# compute the amplitude of the input signal arena
class Detect(factory,
              family="flocor.ampcor.factories.detectors.detect",
              implements=flocor.ampcor.protocols.detect):
    """
    Generate an arena of the pixel amplitudes
    """


    # inputs
    signal = flocor.ampcor.protocols.arena.input()
    signal.doc = "the metadata of the reference SLC product"

    # output
    amplitude = flocor.ampcor.protocols.arena.output()
    amplitude.doc = "the correlation plan"


# end of file
