# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# support
import flocor


# the product payload
class SLCDataset(flocor.flow.specification, family="flocor.products.datasets"):
    """
    A dataset provides access to the actual data
    """


    # public data
    # the payload; leave untyped for now
    data = flocor.properties.object()
    data.doc = "the memory payload"


# end of file
