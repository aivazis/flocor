# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene


# trait types from {pyre.schemata}
class Trait(graphene.ObjectType):
    """
    A basic trait from {pyre.schemata}
    """


    # the fields
    family = graphene.String(required=True)
    category = graphene.String(required=True)


    @classmethod
    def resolve(cls):
        """
        Fetch all of them and put them in a pile
        """
        # get {schemata} from pyre
        import pyre.schemata

        # the basic
        yield Trait(family=pyre.schemata.bool.typename, category="basic")
        yield Trait(family=pyre.schemata.str.typename, category="basic")
        yield Trait(family=pyre.schemata.int.typename, category="basic")
        yield Trait(family=pyre.schemata.float.typename, category="basic")
        yield Trait(family=pyre.schemata.complex.typename, category="basic")

        # composites
        yield Trait(family=pyre.schemata.path.typename, category="composite")
        yield Trait(family=pyre.schemata.dimensional.typename, category="composite")
        yield Trait(family=pyre.schemata.date.typename, category="composite")
        yield Trait(family=pyre.schemata.time.typename, category="composite")
        yield Trait(family=pyre.schemata.timestamp.typename, category="composite")

        # higher level types
        yield Trait(family=pyre.schemata.istream.typename, category="host")
        yield Trait(family=pyre.schemata.ostream.typename, category="host")
        yield Trait(family=pyre.schemata.envvar.typename, category="host")

        # all done
        return


# end of file
