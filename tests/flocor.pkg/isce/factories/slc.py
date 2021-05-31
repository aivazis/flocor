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
    import flocor.isce.factories
    # make an SLC reader
    slcReader = flocor.isce.factories.slcReader()(name="ref")

    # get the journal
    import journal
    # make a channel
    channel = journal.info("flocor.factories.slc")
    # and show me
    channel.line(f"slc reader:")
    channel.line(f"  name: {slcReader.pyre_name}")
    channel.line(f"  uri: {slcReader.uri}")
    channel.line(f"  shape: {slcReader.shape}")
    channel.line(f"  meta: {slcReader.meta}")
    channel.line(f"  data: {slcReader.data}")
    # flush
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
