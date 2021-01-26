#! /usr/bin/env python3
# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the driver
def test():
    """
    Verify we can build and use 2D layouts
    """
    # get the package
    import flocor
    # get the bindings
    libflocor = flocor.ext.libflocor

    # verify that the layout objects exist
    assert libflocor.Layout2D

    # make a shape
    shape = libflocor.Shape2D(shape=(256,128))
    # and an oriign
    origin = libflocor.Index2D(index=(-2,17))
    # use it to make a layout
    layout = libflocor.Layout2D(shape=shape, origin=origin)

    # check the shape
    assert tuple(layout.shape) == (256,128)
    # and the origin
    assert tuple(layout.origin) == (-2,17)

    # all done
    return 0


# bootstrap
if __name__ == "__main__":
    # invoke the driver
    status = test()
    # and share the status with the shell
    raise SystemExit(status)


# end of file
