# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import uuid
# framework
import flocor


# a simple node
class Macro:


    # metamethods
    def __init__(self, name=None, family="int", **kwds):
        # chain up
        super().__init__(**kwds)

        # build my id
        self.pyre_id = uuid.uuid1()
        # attach my name
        self.pyre_name = name
        # look up my type
        self.pyre_schema = getattr(flocor.schemata, family)

        # all done
        return


# end of file
