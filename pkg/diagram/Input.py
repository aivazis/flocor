# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# superclass
from .Connector import Connector


# an input connector
class Input(Connector):
    """
    Representation of a connector from a {factory} to one or more of its inputs
    """

    # constants
    typename = "Input"


    # interface
    def add(self, trait):
        """
        Add {trait} to this connection
        """
        # if {trait} is indeed an input
        if trait.input:
            # add it to my pile
            return super().add(trait=trait)

        # otherwise, we have a problem
        import journal
        # which is almost certainly a bug
        channel = journal.firewall("flocor.diagram.input")
        # so complain
        channel.line("while adding '{trait.name}' to {self}:")
        channel.log("'{trait.name}' is not an input")
        # just in case firewalls aren't fatal
        return


    # implementation details
    def placeLabel(self):
        """
        Compute the location of my trait label
        """
        # unpack the factory position
        _, fy = self.factory.position
        # and the slot position
        sx, sy = self.slot.position
        # compute the label position
        lx = sx + 1
        ly = sy + (0.5 if sy > fy else -0.25)
        # pack it and ship it
        return lx, ly


# end of file
