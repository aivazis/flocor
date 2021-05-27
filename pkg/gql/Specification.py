# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene


# data product protocol
class Specification(graphene.ObjectType):
    """
    {Specification} is the protocol that {Product} implements
    """

    # the fields
    family = graphene.String(required=True)


    # the resolvers
    def resolve_family(product, *_):
       return product.pyre_family()


# end of file
