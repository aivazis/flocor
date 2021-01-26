#! /usr/bin/env python3
# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the driver
def test():
    """
    Verify we can build and use 2D indices
    """
    # get the package
    import flocor
    # get the bindings
    libflocor = flocor.ext.libflocor

    # verify that the shape bindings are accessible
    assert libflocor.Index2D

    # make a index
    index = libflocor.Index2D(index=(1,2))
    # verify the rank
    assert index.rank == 2

    # leverage iteration support to unpack a shape
    lines, samples = index
    # verify it worked
    assert lines == 1
    assert samples == 2

    # all done
    return 0


# bootstrap
if __name__ == "__main__":
    # invoke the driver
    status = test()
    # and share the status with the shell
    raise SystemExit(status)


# end of file
