# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene

# my node type
from .Eval import Eval


# a flow node that represents an operator:w
class EvalConnection(graphene.relay.Connection):
    """
    A connection to a list of operators
    """


    # {graphene} metadata
    class Meta:
        # register my node type
        node = Eval


# end of file
