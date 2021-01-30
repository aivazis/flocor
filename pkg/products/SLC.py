# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor


# an SLC is a flow product that encapsulates a complex raster of a given shape
class SLC(flocor.flow.product,
          family="flocor.products.slc.slc",
          implements=flocor.specs.slc):
    """
    An SLC raster

    This is the fully formed and decorated SLC data product that can be consumed by workflows
    """


    # public data
    # my metadata
    shape = flocor.properties.tuple(schema=flocor.properties.int())
    shape.doc = "a pair of integers that describes the shape of the raster"

    # my dataset grants access to my data grid
    data = flocor.specs.slcDataset()
    data.doc = "the payload"


# end of file
