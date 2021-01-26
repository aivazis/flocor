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
    # use it to make a layout
    layout = libflocor.Layout2D(shape)

    print(layout)

    # all done
    return 0


# bootstrap
if __name__ == "__main__":
    # invoke the driver
    status = test()
    # and share the status with the shell
    raise SystemExit(status)


# end of file
