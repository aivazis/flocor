# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene

# my node type
from .Macro import Macro


# a flow node that represents a typed+named variable
class MacroConnection(graphene.relay.Connection):
    """
    A connection to a list of macros
    """


    # {graphene} metadata
    class Meta:
        # register my node type
        node = Macro


# end of file
