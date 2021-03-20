# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene

# the query
from .Query import Query
# the top level types
from .Catalog import Catalog
from .Flow import Flow
from .Version import Version

# flow nodes
from .Macro import Macro


# build the schema
schema = graphene.Schema(
    # supported operations
    query=Query,
    # the concrete types in the schema
    types=[
        # the flow
        Flow,
        # flow nodes
        Macro,
        # factories and products from specific packages
        Catalog,
        # administrative
        Version,
    ]
)


# end of file
