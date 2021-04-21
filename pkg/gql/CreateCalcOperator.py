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
from .Factory import Factory
from .Position import Position
# the class that holds the new node metadata that is input to the mutation
from .NewNodeInput import NewNodeInput


# a mutation that adds a new node to the flow
class CreateCalcOperator(graphene.Mutation):
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
        owner = nodeinfo["flow"]
        family = nodeinfo["family"]
        x = nodeinfo["x"]
        y = nodeinfo["y"]

        # get the panel
        panel = info.context["panel"]
        # so we can grab the {flow}; we can use {owner} to do a consistency check that
        # the node is being added to the correct graph
        flow = panel.flow
        # and its {layout}
        layout = panel.layout

        # make a {factory}; we don't have a name for it yet
        op = flocor.flows.operator(family=family)
        # add it to the flow
        flow.addFactory(node=op)
        # and the layout
        layout[op.pyre_id] = {"x": x, "y": y}

        # make a factory node
        node = Factory(id=op.pyre_id, family=family, position=Position(x=x, y=y))
        # attach it and return it
        return CreateCalcOperator(flow=owner, node=node)


# end of file
