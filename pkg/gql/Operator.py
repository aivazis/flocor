# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene


# operators from {pyre.calc}
class Operator(graphene.ObjectType):
    """
    An operator from {pyre.calc}
    """


    # the fields
    category = graphene.String(required=True)
    family = graphene.String(required=True)
    inputs = graphene.List(graphene.NonNull(graphene.String))
    outputs = graphene.List(graphene.NonNull(graphene.String))


    @classmethod
    def resolve(cls):
        """
        Fetch all of them and put them in a pile
        """
        # make some up
        names = "add", "sub", "mul", "div"

        # turn each name
        for name in names:
            # into a binary operator
            yield Operator(
                family=f"pyre.calc.{name}", category="operator",
                inputs=["op1", "op2"], outputs=["value"])

        # all done
        return


# end of file
