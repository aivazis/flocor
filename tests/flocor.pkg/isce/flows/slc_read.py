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
    # get the journal
    import journal
    # make a channel
    channel = journal.debug("flocor.isce.flows.slc_read")

    # get the package
    import flocor
    # make an SLC reader
    slcReader = flocor.isce.factories.slcReader()(name="refReader")

    # configure it
    slcReader.uri = "slc.data"
    slcReader.shape = 128,128

    # get the outputs
    data = slcReader.data
    meta = slcReader.meta

    # force the update
    slcReader.pyre_make()

    # check
    assert meta.shape == tuple(data.data.layout.shape)
    assert data.data[127,127] == 127*128 + 127 + 0j

    # show me
    channel.line(f"slcReader: {slcReader}")
    channel.line(f"  uri: '{slcReader.uri}'")
    channel.line(f"  shape: {slcReader.shape}")
    channel.line(f"  meta:")
    channel.line(f"    name: {slcReader.meta.pyre_name}")
    channel.line(f"    family: {slcReader.meta.pyre_family()}")
    channel.line(f"    stale: {slcReader.meta.pyre_stale}")
    channel.line(f"    shape: {slcReader.meta.shape}")
    channel.line(f"  data:")
    channel.line(f"    name: {slcReader.data.pyre_name}")
    channel.line(f"    family: {slcReader.data.pyre_family()}")
    channel.line(f"    stale: {slcReader.data.pyre_stale}")
    channel.line(f"    layout:")
    channel.line(f"      origin: ({slcReader.data.data.layout.origin})")
    channel.line(f"      shape: ({slcReader.data.data.layout.shape})")
    channel.line(f"      order: ({slcReader.data.data.layout.order})")
    channel.line(f"      strides: ({slcReader.data.data.layout.strides})")
    channel.line(f"    cells: {slcReader.data.data.cells}")
    channel.line(f"    bytes: {slcReader.data.data.bytes}")
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
