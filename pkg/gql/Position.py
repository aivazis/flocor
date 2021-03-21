# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene


# the position of a flow node in native coordinates
class Position(graphene.ObjectType):
    """
    A point in diagram coordinates
    """


    # the fields
    x = graphene.Int(required=True)
    y = graphene.Int(required=True)


# end of file
