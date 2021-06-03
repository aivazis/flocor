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
                family="flocor.isce.factories.slc.readSLC",
                implements=flocor.isce.protocols.slcFactory):
    """
    An SLC factory that make a product given a shape and a path to the payload
    """


    # user configurable state
    uri = flocor.properties.path()
    uri.doc = "the path to the file with the payload"

    shape = flocor.properties.tuple(schema=flocor.properties.int())
    shape.doc = "a pair of integers that describes the shape of the SLC in (lines,samples)"

    # outputs
    meta = flocor.isce.protocols.slcMetadata.output()
    meta.doc = "the metadata of the SLC product"

    data = flocor.isce.protocols.slcDataset.output()
    data.doc = "the payload of the SLC product"


    # framework hooks
    def pyre_run(self, **kwds):
        """
        Build my outputs
        """
        # unpack my configuration
        uri = self.uri
        shape = self.shape
        # and my outputs
        meta = self.meta
        data = self.data

        # use it to decorate my metadata
        meta.shape = shape
        # and build access to the payload
        data.data = flocor.ext.libflocor.SLCConstDataset(uri=uri, shape=shape)

        # all done
        return self


# end of file
