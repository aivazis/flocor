# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import uuid
# framework
import flocor


# base class for factories
class Factory(flocor.flow.factory, family="flocor.factories.factory"):
    """
    The base class for {flocor} factories
    """


    # metamethods
    def __init__(self, **kwds):
        # chain up
        super().__init__(**kwds)
        # make my node id
        self.pyre_id = uuid.uuid1()
        # all done
        return


# end of file
