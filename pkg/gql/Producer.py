# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene
# local types
from .Specification import Specification


# factory protocol
class Producer(graphene.ObjectType):
    """
    {Producer} is the protocol that {factory} implements
    """

    # the fields
    family = graphene.String(required=True)
    inputs = graphene.List(graphene.NonNull(graphene.String))
    outputs = graphene.List(graphene.NonNull(graphene.String))


# end of file
