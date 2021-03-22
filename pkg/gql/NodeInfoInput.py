# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene


# node input
class NodeInfoInput(graphene.InputObjectType):
    """
    Node input information
    """


    # the fields
    category = graphene.String(required=True)
    family = graphene.String(required=True)
    x = graphene.Int(required=True)
    y = graphene.Int(required=True)


# end of file
