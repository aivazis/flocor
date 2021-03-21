# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene
import journal

# local types
from .Catalog import Catalog
from .Flow import Flow
from .Trait import Trait
from .Version import Version


# the query
class Query(graphene.ObjectType):
    """
    The top level query
    """

    # the fields
    # the flow graph
    flow = graphene.Field(Flow, required=True,
                          name=graphene.String(default_value=""))
    # basic trait types from {pyre.schemata}
    traits = graphene.List(graphene.NonNull(Trait))
    # factories and products from a package
    catalog = graphene.Field(Catalog, required=True,
                             package=graphene.String(default_value="flocor"))
    # server version info
    version = graphene.Field(Version, required=True)


    # the resolvers
    # the flow
    def resolve_flow(root, info, **kwds):
        """
        Generate a representation of the current workflow
        """
        # get the panel
        panel = info.context["panel"]
        # and pass it on
        return panel


    # basic trait types from {pyre.schemata}
    def resolve_traits(root, info, **kwds):
        """
        Generate a list of all trait types that the client can compute with
        """
        # the type definition has a method that builds a list
        return list(Trait.resolve())


    # catalog
    def resolve_catalog(root, info, **kwds):
        """
        Generate a list of all known specifications and producers in a given package
        """
        # this resolver must exist; its job is to build an object that gets handed to the
        # {Catalog} resolvers; here we would prep such an object using the query execution
        # context and the variable bindings in {kwds}, but for {Catalog} this is not necessary
        #
        #     root: should be {None}; this is the root
        #     info: has {.context} with whatever was built by the executioner
        #     kwds: contains the variable bindings for this catalog resolution
        #
        return kwds


    # version
    def resolve_version(root, info):
        """
        Build and return the server version
        """
        # prep an empty context for the {version} resolution
        return {}


# end of file
