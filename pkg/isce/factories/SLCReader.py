# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# superclass
from .Factory import Factory


# an SLC factory, given a shape and a filename
class SLCReader(Factory,
                family="flocor.isce.factories.slcReader",
                implements=flocor.isce.protocols.slcFactory):
    """
    An SLC factory that make a product given a shape and a path to the payload
    """


    # inputs
    uri = flocor.properties.path()
    uri.doc = "the path to the file with the payload"

    shape = flocor.properties.tuple(schema=flocor.properties.int())
    shape.doc = "a pair of integers that describes the shape of the SLC in (lines,samples)"

    # output
    slc = flocor.isce.protocols.slc.output()
    slc.doc = "the SLC data product"


# end of file
