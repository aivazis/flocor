# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# superclass
from .Node import Node


# slots, both bound and unbound
class Slot(Node):
    """
    The representation of a slot
    """

    # public data
    @property
    def typename(self):
        """
        The name of my type
        """
        # i'm either a product or a slot
        return "Product" if self.product is not None else "Slot"


    @property
    def connections(self):
        """
        An iterable of my connections to factories
        """
        # go through my connectivity table
        for factory, trait in self.connectors:
            # and build a canonical representation of the connection
            yield factory, trait, self
        # all done
        return


    # interface
    def bind(self, product):
        """
        Associate me with a product
        """
        # if i already have one
        if self.product:
            # this is an error
            import journal
            # that's almost certainly a bug
            channel = journal.firewall("flocor.diagram.slot")
            # so complain
            channel.line(f"{self}: while binding to {product}")
            channel.log(f"this slot is already bound to {self.product}")
            # just in case firewalls are not fatal
            return self

        # otherwise, bind me to the product
        self.product = product
        # all done
        return self


    def connect(self, factory, trait):
        """
        Add the {trait} of a {factory} to the set of my clients
        """
        # add the connection to to my pile
        self.connectors.add((factory,trait))
        # all done
        return self


    def merge(self, other):
        """
        Consolidate me with the {other} slot
        """
        # if both are bound
        if self.product is not None and other.product is not None:
            # this is an error
            import journal
            # that's almost certainly a bug
            channel = journal.firewall("flocor.diagram.slot")
            # so complain
            channel.line(f"{self}: while merging with {other}")
            channel.line(f"{self} is already bound to {self.product}")
            channel.log(f"{other} is already bound to {other.product}")
            # just in case firewalls are not fatal
            return self

        # set the product binding
        self.product = self.product or other.product

        # go through the connection in {other}
        for factory, trait in other.connectors:
            # NYI: compatibility tests
            # tell the factory it is connected to me; the factory will also update my
            # connectivity table
            factory.connect(trait=trait, slot=self)

        # other is now obsolete
        other.clear()

        # all done
        return


    # metamethods
    def __init__(self, product=None, **kwds):
        # chain up
        super().__init__(**kwds)
        # attach the product i'm bound to; {None} if the slot is free
        self.product = product
        # initialize my bindings
        self.connectors = set()
        # all done
        return


    def __str__(self):
        # sometimes i'm a slot, sometimes i'm a product
        return f"{self.typename} '{self.pyre_id}'"


    # implementation details
    def clear(self):
        """
        Someone else has taken my place
        """
        # i don't have a product any more
        self.product = None
        # clear out my connectors
        self.connectors = set()
        # all done
        return


# end of file
