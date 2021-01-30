# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# support
import flocor


# base class that anchors the family name so all {flocor} products are discoverable
class Specification(flocor.flow.specification, family="flocor.products"):
    """
    The base class for all {flocor} data products
    """


# end of file
