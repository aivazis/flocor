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
from .Eval import Eval
from .Macro import Macro
from .Position import Position
# the class that holds the new node metadata that is input to the mutation
from .CreateNodeInput import CreateNodeInput


# a mutation that adds a new node to the flow
class CreateNode(graphene.Mutation):
    """
    A mutation that adds a new node to the flow
    """


    # inputs
    class Arguments:
        nodeinfo = CreateNodeInput(required=True)


    # fields
    node = graphene.Field(Node, required=True)


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

            # make a macro node
            node = Macro(id=macro.pyre_id, family=family, position=Position(x=x, y=y))
            # attach it and return it
            return CreateNode(node=node)

        if category == "operator":
            # make an operator node
            op = flocor.flows.operator(family=family)
            # add it to the flow
            flow.addNode(node=op)
            # and the layout
            layout[op.pyre_id] = {"x": x, "y": y}

            # make an operator node
            node = Eval(id=op.pyre_id, family=family, position=Position(x=x, y=y))
            # attach it and return it
            return CreateNode(node=node)

        # if we get this far, there is something wrong
        raise Exception("unknown node category")


# end of file
