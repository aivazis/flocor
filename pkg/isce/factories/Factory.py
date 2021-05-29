# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# my protocol
from flocor.isce.protocols import producer


# base class for local factories
class Factory(flocor.flow.factory, implements=producer, internal=True):
    """
    The base class for {flocor.isce} factories
    """


# end of file
