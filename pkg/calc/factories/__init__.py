# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the framework
import flocor

# the protocols
from .Producer import Producer as producer
# and the base classes
from .Factory import Factory as factory


# factories
@flocor.foundry(implements=producer, tip="add two values")
def add():
    """
    Add two values
    """
    # pull the factory
    from .Add import Add
    # and publish it
    return Add


@flocor.foundry(implements=producer, tip="subtract two values")
def sub():
    """
    Subtract two values
    """
    # pull the factory
    from .Sub import Sub
    # and publish it
    return Sub


@flocor.foundry(implements=producer, tip="multiply two values")
def mul():
    """
    Multiply two values
    """
    # pull the factory
    from .Mul import Mul
    # and publish it
    return Mul


@flocor.foundry(implements=producer, tip="divide a value by another")
def div():
    """
    Divide a value by another
    """
    # pull the factory
    from .Div import Div
    # and publish it
    return Div


# end of file
