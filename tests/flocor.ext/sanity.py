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
    # get the bindings
    import flocor.ext
    # verify that the extension module exists and is importable
    assert flocor.ext.libflocor
    # all done
    return 0


# bootstrap
if __name__ == "__main__":
    # invoke the driver
    status = test()
    # and share the status with the shell
    raise SystemExit(status)


# end of file