# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# get the framework
import pyre

# the base class for my exceptions
class FloCorError(pyre.PyreError):
    """
    Base class for all flocor errors
    """

# component configuration errors
class ConfigurationError(FloCorError):
    """
    Exception raised when flocor components detect inconsistencies in their configurations
    """

    # public data
    description = "configuration error: {0.reason}"

    # meta-methods
    def __init__(self, reason, **kwds):
        # chain up
        super().__init__(**kwds)
        # save the error info
        self.reason = reason
        # all done
        return


# end of file
