# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved

# externals
import graphene
# package
import flocor
# local types
from .Position import Position
from .NodeInfoInput import NodeInfoInput


# a mutation that adds a new node to the flow
class CreateNode(graphene.Mutation):
    """
    A mutation that adds a new node to the flow
    """


    # inputs
    class Arguments:
        nodeinfo = NodeInfoInput(required=True)


    # fields
    id = graphene.ID()
    position = graphene.Field(Position, required=True)


    def mutate(root, info, nodeinfo):
        # unpack the node info
        category = nodeinfo["category"]
        family = nodeinfo["family"]
        x = nodeinfo["x"]
        y = nodeinfo["y"]

        # get the panel
        panel = info.context["panel"]
        # so we can grab the {flow}
        flow = panel.flow
        # and its {layout}
        layout = panel.layout

        # figure out what kind of node we are creating
        # some markers indicate a {calc} node
        if category in ["basic", "composite", "host"]:
            # make a {macro}; we don't have a name for it yet
            macro = flocor.flows.macro(family=family)
            # add it to the flow
            flow.addNode(node=macro)
            # and the layout
            layout[macro.pyre_id] = {"x": x, "y": y}
            # make a node and return it
            return CreateNode(id=macro.pyre_id, position=Position(x=x, y=y))

        # if we get this far, there is something wrong
        raise Exception("unknown node category")


# end of file
