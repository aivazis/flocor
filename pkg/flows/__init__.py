# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the framework
import flocor
# publish
# the container
from .Flow import Flow as flow
# the nodes
from .Product import Product


# calc
# variables
def var(family):
    # extract the schema from the family name and look up the type descriptor
    schema = getattr(flocor.schemata, family.split('.')[-1])
    # hold on to the schema until we are ready to build a variable

    # in the meantime, make a product
    product = Product()

    # and return it
    return product


def calcVariables():
    """
    Enumerate the accessible schemata for {pyre.calc} variables
    """
    # grab the known {pyre} types
    import pyre.schemata
    # the types of interest
    types = [
        "str",
        "bool", "int", "float", "complex",
        "path", "dimensional", "date", "time", "timestamp",
        "istream", "ostream", "envvar",
    ]
    # go through them
    for typename in types:
        # look up the schema
        schema = getattr(pyre.schemata, typename)
        # convert it into a family name and make it available
        yield f"pyre.calc.{schema.typename}"
    # all done
    return


# calc operators
from .Operator import Operator as operator


# end of file
