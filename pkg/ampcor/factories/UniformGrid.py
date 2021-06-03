# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor
# superclass
from .Factory import Factory as factory


# cover a dataset of a known shape with a uniform grid
class UniformGrid(factory,
                  family="flocor.isce.factories.covers.uniformGrid",
                  implements=flocor.ampcor.protocols.cover):
    """
    A cover that generates a uniform grid of points over a rectangle of a given shape
    """


    # user configurable state
    shape = flocor.properties.tuple(schema=flocor.properties.int())
    shape.default = 1,1
    shape.doc = "the shape of the generated grid of points"


    # inputs
    meta = flocor.isce.protocols.slcMetadata.input()
    meta.doc = "the metadata of the SLC product"

    # outputs
    pixels = flocor.isce.protocols.pixels.output()
    pixels.doc = "the bag of generated pixel coordinates"


    # framework hooks
    def pyre_run(self, **kwds):
        """
        Refresh my outputs
        """
        # unpack
        shape = flocor.ext.libflocor.Shape2D(shape=self.shape)
        bounds = flocor.ext.libflocor.Shape2D(shape=self.meta.shape)
        pixels = self.pixels

        # build the covering grid and attach it
        pixels.pixels = flocor.ext.libflocor.uniform_grid(shape=shape, bounds=bounds)

        # all done
        return self


# end of file
