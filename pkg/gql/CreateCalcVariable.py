# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved

# externals
import graphene
# package
import flocor

# the node interface
from .Node import Node
# local types
from .Macro import Macro
from .Position import Position
# the class that holds the new node metadata that is input to the mutation
from .NewNodeInput import NewNodeInput


# a mutation that adds a new node to the flow
class CreateCalcVariable(graphene.Mutation):
    """
    A mutation that adds a new node to the flow
    """


    # inputs
    class Arguments:
        nodeinfo = NewNodeInput(required=True)


    # fields
    flow = graphene.ID()
    node = graphene.Field(Node, required=True)


    def mutate(root, info, nodeinfo):
        # unpack the node info
        flow = nodeinfo["flow"]
        family = nodeinfo["family"]
        x = nodeinfo["x"]
        y = nodeinfo["y"]

        # get the panel
        panel = info.context["panel"]
        # so we can grab the {flow}
        flow = panel.flow
        # and its {layout}
        layout = panel.layout

        # make a {macro}; we don't have a name for it yet
        var = flocor.flows.var(family=family)
        # add it to the flow
        flow.addNode(node=var)
        # and the layout
        layout[var.pyre_id] = {"x": x, "y": y}

        # make a macro node
        node = Macro(id=var.pyre_id, family=family, position=Position(x=x, y=y))
        # attach it and return it
        return CreateCalcVariable(node=node)


# end of file
