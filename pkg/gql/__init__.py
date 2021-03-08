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
from .Version import Version


# build the schema
schema = graphene.Schema(
    # supported operations
    query=Query,
    # the concrete types in the schema
    types=[
        # administrative
        Version,
        # factories and products from specific packages
        Catalog,
    ]
)


# end of file
