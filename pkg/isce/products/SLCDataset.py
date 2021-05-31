# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# my base class
from .Product import Product as product


# an SLC is a flow product that encapsulates a complex raster of a given shape
class SLCDataset(product,
          family="flocor.isce.products.slcDataset.slcDataset",
          implements=flocor.isce.protocols.slcDataset):
    """
    An SLC raster
    """


    # public data
    # my dataset grants access to my data grid
    data = flocor.properties.object()
    data.doc = "the payload"


# end of file
