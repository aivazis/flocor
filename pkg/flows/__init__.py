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
from .Factory import Factory
from .Product import Product

# the known variable types
from . import variables


# calc
# variables
def var(family):
    # lookup the associated class
    cls = variables.index[family]
    # instantiate
    product = cls()
    # and return it
    return product


def calcVariables():
    """
    Enumerate the accessible schemata for {pyre.calc} variables
    """
    # publish the set of known variable type names
    yield from variables.index.keys()
    # all done
    return


# calc operators
def operator(family):
    # extract the operator type from the family name
    opname = family.split('.')[-1]
    # hold on to it until we are ready to create the node
    # in the meantime, make a factory
    factory = Factory(family=family)
    # and return it
    return factory


def calcOperators():
    """
    Enumerate the accessible {pyre.calc} operators
    """
    # the binary operators
    binary = [
        "add", "sub", "mul", "div",
    ]
    # go through them
    for opname in binary:
        # convert each one into a family name and make it available
        yield f"pyre.calc.{opname}", ["op1", "op2"], ["value"]
    # all done
    return


# end of file
