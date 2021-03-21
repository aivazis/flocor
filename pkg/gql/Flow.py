# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene

# local
from .Macro import Macro
from .Position import Position


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
    def resolve_id(panel, info, **kwds):
        # unpack
        flow = panel.flow
        # return the {flow} id
        return flow.pyre_id


    def resolve_name(panel, info, **kwds):
        # unpack
        flow = panel.flow
        # return the {flow} name
        return flow.pyre_name


    def resolve_family(panel, info, **kwds):
        # unpack
        flow = panel.flow
        # return the {flow} family name
        return flow.pyre_family()


    def resolve_macros(panel, info, **kwds):
        # unpack
        flow = panel.flow
        layout = panel.layout

        # go through the nodes in {flow}
        for node in flow.nodes:
            # get its id
            guid = node.pyre_id
            # look up its position
            x, y = layout[guid]
            # serialize it
            yield Macro(id=guid, name=node.pyre_name, family=node.pyre_schema.typename,
                        position=Position(x=x, y=y))

        # and done
        return


# end of file
