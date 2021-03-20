# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene


# a flow node that represents a typed+named variable
class Macro(graphene.ObjectType):
    """
    A basic named node
    """


    # the fields
    id = graphene.ID()
    name = graphene.String(required=True)
    family = graphene.String(required=True)


# end of file
