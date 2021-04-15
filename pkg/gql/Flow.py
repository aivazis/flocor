# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene

# my interface
from .Node import Node
# local basic types
from .Eval import Eval
from .Macro import Macro
from .Position import Position
# connections
from .EvalConnection import EvalConnection
from .MacroConnection import MacroConnection


# trait types from {pyre.schemata}
class Flow(graphene.ObjectType):
    """
    The container of products, factories, and their bindings
    """

    # {graphene} metadata
    class Meta:
        # register my interface
        interfaces = Node,

    # metadata
    id = graphene.ID(required=True)
    name = graphene.String(required=True)
    family = graphene.String(required=True)
    # products
    macros = graphene.relay.ConnectionField(MacroConnection)
    # factories
    evaluators = graphene.relay.ConnectionField(EvalConnection)


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


    def resolve_evaluators(panel, info, **kwds):
        # unpack
        flow = panel.flow
        layout = panel.layout
        # return an empty pile, for now
        return []


    def resolve_macros(panel, info, **kwds):
        # unpack
        flow = panel.flow
        layout = panel.layout

        # make a pile
        macros = []

        # go through the nodes in {flow}
        for guid, node in flow.nodes.items():
            # look up its position
            position = layout[guid]
            # unpack
            x = position["x"]
            y = position["y"]
            # represent
            macro = Macro(id=guid, name=node.pyre_name, family=node.pyre_schema.typename,
                        position=Position(x=x, y=y))
            # and add to the pile
            macros.append(macro)

        # return the pile
        return macros


# end of file
