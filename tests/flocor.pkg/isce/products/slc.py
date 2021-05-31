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
    import flocor.isce.products
    # make an SLC
    slc = flocor.isce.products.slc()(name="ref")

    # get the journal
    import journal
    # make a channel
    channel = journal.info("flocor.isce.products.slc")
    # and show me
    channel.line(f"slc: {slc}")
    channel.line(f"    name: {slc.pyre_name}")
    channel.line(f"    family: {slc.pyre_family()}")
    channel.line(f"    stale: {slc.pyre_stale}")
    channel.line(f"    data: {slc.data}")
    channel.log()

    # all done
    return 0


# bootstrap
if __name__ == "__main__":
    # invoke the driver
    status = test()
    # and share the status with the shell
    raise SystemExit(status)


# end of file
