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
    from flocor.ext import libflocor

    # verify that the layout object bindings exist
    assert libflocor.Layout2D

    # pick a shape
    dim = 256,128
    dim = 2,3
    # and the layout origin
    org = -2, 17

    # make a shape
    shape = libflocor.Shape2D(shape=dim)
    # and an origin
    origin = libflocor.Index2D(index=org)
    # use it to make a layout
    layout = libflocor.Layout2D(shape=shape, origin=origin)

    # check the shape
    assert tuple(layout.shape) == dim
    # the origin
    assert tuple(layout.origin) == org
    # the strides
    assert tuple(layout.strides) == (dim[1], 1)
    # and the nudge, using its definition
    assert layout.nudge == layout.offset(index=(0,0))

    # iterate over the layout in its native order
    for index in layout:
        # verify the index identity; convert to tuples since we don't have {__eq__} yet
        assert tuple(layout.index(layout.offset(index))) == tuple(index)

    # go through all possible offsets
    for offset in range(layout.shape.cells):
        # verify the offset identity
        assert layout.offset(layout.index(offset)) == offset

    # all done
    return 0


# bootstrap
if __name__ == "__main__":
    # invoke the driver
    status = test()
    # and share the status with the shell
    raise SystemExit(status)


# end of file
