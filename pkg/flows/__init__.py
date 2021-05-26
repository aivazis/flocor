# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the framework
import flocor
# publish
# the nodes
from .Factory import Factory as factory
from .Product import Product as product
# slots are framework items
from pyre.framework.Slot import Slot as slot

# the known variable types
from . import variables
# and the known operators
from . import operators


# calc
# variables
def var(family):
    """
    Resolve the {family} name into a variable instance
    """
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
    """
    Resolve the {family} name into an operator instance
    """
    # lookup the associated class
    cls = operators.index[family]
    # instantiate
    factory = cls()
    # and return it
    return factory


def calcOperators():
    """
    Enumerate the accessible {pyre.calc} operators
    """
    # grab all items from the {operators} index
    for name, cls in operators.index.items():
        # look up the names of my inputs
        inputs = [ trait.name for trait in cls.pyre_inputTraits]
        # and my outputs
        outputs = [ trait.name for trait in cls.pyre_outputTraits]
        # send the required info off
        yield name, inputs, outputs
    # all done
    return


# end of file
