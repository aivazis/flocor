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


    # constants
    typename = "Slot"

    # public data
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
        # NYI: compatibility tests

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
            return other

        # otherwise, we have some changes to make
        # during the merge process, all information from {other} moves to me

       # ask {other} for its binding
        product = other.product
        # if it is bound
        if product is not None:
            # all my connections
            for factory, trait in self.connectors:
                # must be bound to it
                setattr(factory, trait.name, product)
        # get my product
        product = self.product
        # if i'm the one that's bound
        if product is not None:
            # all the connections in {other}
            for factory, trait in other.connectors:
                # must be bound to it
                setattr(factory, trait.name, product)

        # regardless, go through the connections in {other}
        for factory, trait in other.connectors:
            # tell the factory it is connected to me; the factory will also update my
            # connectivity table
            factory.connect(trait=trait, slot=self)

        # set the product binding
        self.product = self.product or other.product
        # save a copy of the connections held by {other}
        connectors = other.connectors
        # other is now obsolete
        other.clear()

        # all done; send back {other} and its old connectors
        return other, connectors


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
        # binding decoration
        bound = "unbound" if self.product is None else "bound"
        return f"{self.typename} '{self.pyre_id}' ({bound})"


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
