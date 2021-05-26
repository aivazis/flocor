# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# my protocol
from .Producer import Producer


# base class for local factories
class Factory(flocor.flow.factory, implements=Producer):
    """
    The base class for {flocor.calc} factories
    """


# end of file
