# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# the framework
import flocor
# the base product
from .Product import Product


# strings
class String(Product, family="flocor.products.str"):
    """
    A product that holds a single string
    """

    # my value
    value = flocor.properties.str()


# logical
class Bool(Product, family="flocor.products.bool"):
    """
    A product that holds a boolean
    """

    # my value
    value = flocor.properties.bool()


# numerical
class Int(Product, family="flocor.products.int"):
    """
    A product that holds an integer
    """

    # my value
    value = flocor.properties.int()


class Float(Product, family="flocor.products.float"):
    """
    A product that holds a floating point number
    """

    # my value
    value = flocor.properties.float()


class Complex(Product, family="flocor.products.complex"):
    """
    A product that holds a complex number
    """

    # my value
    value = flocor.properties.complex()


class Dimensional(Product, family="flocor.products.dimensional"):
    """
    A product that holds a value with units
    """

    # my value
    value = flocor.properties.dimensional()


# composites
class Path(Product, family="flocor.products.path"):
    """
    A product that holds a path
    """

    # my value
    value = flocor.properties.path()


class Date(Product, family="flocor.products.date"):
    """
    A product that holds a date
    """

    # my value
    value = flocor.properties.date()


class Time(Product, family="flocor.products.time"):
    """
    A product that holds a time
    """

    # my value
    value = flocor.properties.time()


class IStream(Product, family="flocor.products.istream"):
    """
    A product that holds an input stream
    """

    # my value
    value = flocor.properties.istream()


class OStream(Product, family="flocor.products.ostream"):
    """
    A product that holds an output stream
    """

    # my value
    value = flocor.properties.ostream()


# put them all on a pile
variables = [
    String,
    Bool,
    Int, Float, Complex, Dimensional,
    Path, Date, Time,
    IStream, OStream,
]


# index them by the family name
index = { cls.pyre_family().split(".")[-1]: cls for cls in variables }


# end of file
