#! /usr/bin/env python3
# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the driver
def test():
    """
    Verify we can build and use 2D shapes
    """
    # get the package
    import flocor
    # get the bindings
    libflocor = flocor.ext.libflocor

    # verify that the shape bindings are accessible
    assert libflocor.Shape2D

    # make a shape
    shape = libflocor.Shape2D(shape=(256,128))
    # verify the rank
    assert shape.rank == 2
    # and the capacity of the shape
    assert shape.cells == 256*128

    # leverage iteration support to unpack a shape
    lines, samples = shape
    # verify it worked
    assert lines == 256
    assert samples == 128

    # all done
    return 0


# bootstrap
if __name__ == "__main__":
    # invoke the driver
    status = test()
    # and share the status with the shell
    raise SystemExit(status)


# end of file
