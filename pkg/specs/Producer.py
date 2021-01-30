# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# support
import flocor


# base class that anchors the family name so all {flocor} factories are discoverable
class Producer(flocor.flow.producer, family="flocor.factories"):
    """
    The base class for all {flocor} factories
    """


# end of file
