# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import uuid
# framework
import flocor


# a simple node
class Variable:


    # metamethods
    def __init__(self, name=None, family=None, **kwds):
        # chain up
        super().__init__(**kwds)

        # extract the schema
        schema = family.split('.')[-1]

        # make a uuid
        gid = uuid.uuid1()
        # build my id by folding in my type
        self.pyre_id = f"Variable:{gid}"
        # attach my name
        self.pyre_name = name
        # look up my type
        self.pyre_schema = getattr(flocor.schemata, schema)

        # all done
        return


# end of file