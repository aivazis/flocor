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


    # the resolvers
    def resolve_family(factory, *_):
        # ask the {factory} for its family name
        return factory.pyre_family()

    def resolve_inputs(factory, *_):
        # go through the names of all input traits
        yield from (trait.name for trait in factory.pyre_inputTraits)
        # all done
        return

    def resolve_outputs(factory, *_):
        # go through the names of all output traits
        yield from (trait.name for trait in factory.pyre_outputTraits)
        # all done
        return


# end of file
