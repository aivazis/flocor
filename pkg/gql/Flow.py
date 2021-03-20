# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene

# local
from .Macro import Macro


# trait types from {pyre.schemata}
class Flow(graphene.ObjectType):
    """
    The container of products, factories, and their bindings
    """


    # the fields
    id = graphene.ID(required=True)
    name = graphene.String(required=True)
    family = graphene.String(required=True)

    macros = graphene.List(graphene.NonNull(Macro), required=True)


    # resolvers
    def resolve_id(flow, info, **kwds):
        # return the {flow} id
        return flow.pyre_id


    def resolve_name(flow, info, **kwds):
        # return the {flow} name
        return flow.pyre_name


    def resolve_family(flow, info, **kwds):
        # return the {flow} family name
        return flow.pyre_family()


    def resolve_macros(flow, info, **kwds):
        # go through the nodes in {flow}
        for node in flow.nodes:
            # serialize it
            yield Macro(id=node.pyre_id, name=node.pyre_name, family=node.pyre_schema.typename)
        # and done
        return


# end of file
