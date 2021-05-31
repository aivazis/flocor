# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# superclass
from .Factory import Factory as factory
# protocols
from .. import protocols


# base class for local factories
class Constant(factory,
               family="flocor.isce.factories.functors.constant",
               implements=protocols.functor):
    """
    A map that applies a constant shift to its input pixels
    """


    # user configurable state
    shift = flocor.properties.tuple(schema=flocor.properties.int())
    shift.default = 0,0
    shift.doc = "the shift to apply to the input pixels"


    # inputs
    domain = flocor.isce.protocols.pixels.input()
    domain.doc = "the bag of generated pixel coordinates"

    # outputs
    range = flocor.isce.protocols.pixels.output()
    range.doc = "the bag of generated pixel coordinates"


# end of file
