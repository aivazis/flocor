# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene

# my node type
from .Label import Label


# a connection for the diagram connectors
class LabelConnection(graphene.relay.Connection):
    """
    A connection to a list of labels
    """


    # {graphene} metadata
    class Meta:
        # register my node type
        node = Label


# end of file
