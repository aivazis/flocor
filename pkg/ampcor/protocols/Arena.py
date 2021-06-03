# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# superclass
from .Specification import Specification as specification


# protocol for describing sequences of pixels
class Arena(specification, family="flocor.ampcor.products.arenas"):
    """
    An arena is a densely packed collection of dataset tiles of a specific shape
    """


# end of file
