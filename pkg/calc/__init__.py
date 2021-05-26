# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the framework
import flocor

# publish the protocols
from .Factory import Factory as factory
from .Product import Product as product


# factories
@flocor.foundry(implements=factory, tip="add two values")
def add():
    """
    Add two values
    """
    # pull the factory
    from .Add import Add
    # and publish it
    return Add


@flocor.foundry(implements=factory, tip="subtract two values")
def sub():
    """
    Subtract two values
    """
    # pull the factory
    from .Sub import Sub
    # and publish it
    return Sub


@flocor.foundry(implements=factory, tip="multiply two values")
def mul():
    """
    Multiply two values
    """
    # pull the factory
    from .Mul import Mul
    # and publish it
    return Mul


@flocor.foundry(implements=factory, tip="divide a value by another")
def div():
    """
    Divide a value by another
    """
    # pull the factory
    from .Div import Div
    # and publish it
    return Div


# products
@flocor.foundry(implements=product, tip="make a variable that holds a string")
def str():
    """
    Make a variable that holds a string
    """
    # pull the product
    from .String import String
    # and publish it
    return String


@flocor.foundry(implements=product, tip="make a variable that holds a boolean")
def bool():
    """
    Make a variable that holds a boolean
    """
    # pull the product
    from .Bool import Bool
    # and publish it
    return Bool


@flocor.foundry(implements=product, tip="make a variable that holds an integer")
def int():
    """
    Make a variable that holds an integer
    """
    # pull the product
    from .Integer import Integer
    # and publish it
    return Integer


@flocor.foundry(implements=product, tip="make a variable that holds a float")
def float():
    """
    Make a variable that holds a float
    """
    # pull the product
    from .Float import Float
    # and publish it
    return Float


@flocor.foundry(implements=product, tip="make a variable that holds a complex value")
def complex():
    """
    Make a variable that holds a complex value
    """
    # pull the product
    from .Complex import Complex
    # and publish it
    return Complex


@flocor.foundry(implements=product, tip="make a variable that holds a quantity with units")
def dimensional():
    """
    Make a variable that holds a quantity with units
    """
    # pull the product
    from .Dimensional import Dimensional
    # and publish it
    return Dimensional


@flocor.foundry(implements=product, tip="make a variable that holds a path")
def path():
    """
    Make a variable that holds a path
    """
    # pull the product
    from .Path import Path
    # and publish it
    return Path


@flocor.foundry(implements=product, tip="make a variable that holds a date")
def date():
    """
    Make a variable that holds a date
    """
    # pull the product
    from .Date import Date
    # and publish it
    return Date


@flocor.foundry(implements=product, tip="make a variable that holds a timestamp")
def time():
    """
    Make a variable that holds a timestamp
    """
    # pull the product
    from .Time import Time
    # and publish it
    return Time


@flocor.foundry(implements=product, tip="make a variable that holds an input stream")
def istream():
    """
    Make a variable that holds an input stream
    """
    # pull the product
    from .IStream import IStream
    # and publish it
    return IStream


@flocor.foundry(implements=product, tip="make a variable that holds an output stream")
def ostream():
    """
    Make a variable that holds an output stream
    """
    # pull the product
    from .OStream import OStream
    # and publish it
    return OStream


# end of file
