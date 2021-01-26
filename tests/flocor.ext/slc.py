#! /usr/bin/env python3
# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the driver
def test():
    """
    Sanity check: attempt to access the package
    """
    # get the package
    import flocor
    # get the bindings
    libflocor = flocor.ext.libflocor

    # verify that the {slc} product spec exists
    assert libflocor.SLC

    # make a new one
    slc = libflocor.SLC(shape=(1024, 512))

    # verify the size of a pixel
    assert slc.bytesPerPixel == 8
    # verify its shape
    assert tuple(slc.shape) == (1024, 512)

    # all done
    return 0


# bootstrap
if __name__ == "__main__":
    # invoke the driver
    status = test()
    # and share the status with the shell
    raise SystemExit(status)


# end of file
