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
    import flocor.products
    # make an SLC
    slc = flocor.products.slc()

    # get the journal
    import journal
    # make a channel
    channel = journal.info("flocor.products.slc")
    # and show me
    channel.log(f"slc: {slc.pyre_name}")

    # all done
    return 0


# bootstrap
if __name__ == "__main__":
    # invoke the driver
    status = test()
    # and share the status with the shell
    raise SystemExit(status)


# end of file
