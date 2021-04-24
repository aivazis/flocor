# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# superclass
from .Node import Node


# base class for factories
class Factory(Node):
    """
    The base class for {flow} factories
    """

    # constants
    typename = "Factory"


# end of file
