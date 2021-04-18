# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene
# local types
from .Specification import Specification


# a factory slot
class Slot(graphene.ObjectType):
    """
    {Slot} captures the relationship between a {product} and its named slot in a {factory}
    """

    # the fields
    name = graphene.String(required=True)
    spec = graphene.Field(Specification, required=True)


# end of file
