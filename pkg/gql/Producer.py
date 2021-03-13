# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene


# factory protocol
class Producer(graphene.ObjectType):
    """
    {Producer} is the protocol that {factory} implements
    """

    # the fields
    family = graphene.String(required=True)

    # the resolvers
    def resolve_family(producer, info, **kwds):
        # easy enough
        return producer.pyre_family()


# end of file