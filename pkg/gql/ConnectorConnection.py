# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene

# my node type
from .Connector import Connector


# a connection for the diagram connectors
class ConnectorConnection(graphene.relay.Connection):
    """
    A connection to a list of products
    """


    # {graphene} metadata
    class Meta:
        # register my node type
        node = Connector


# end of file
