#! /usr/bin/env python3
# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the driver
def test():
    """
    Sanity check: attempt to access the SLC product
    """
    # get the package
    import flocor

    # make an SLC reader
    slcReader = flocor.isce.factories.slcReader()(name="refReader")
    # configure it
    slcReader.uri = "slc.data"
    slcReader.shape = 128,128
    # get the outputs
    data = slcReader.data
    meta = slcReader.meta

    # make a uniform grid cover
    cover = flocor.ampcor.factories.uniformGrid()(name="unigrid")
    # configure it
    cover.shape = 2,2
    # bind it
    cover.meta = meta
    # get its output
    pixels = cover.pixels

    # force the update
    pixels.pyre_make()

    # all done
    return 0


# bootstrap
if __name__ == "__main__":
    # invoke the driver
    status = test()
    # and share the status with the shell
    raise SystemExit(status)


# end of file
