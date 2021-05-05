# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor

# superclass
from .Node import Node
# factory builds these
from .Slot import Slot


# factories
class Factory(Node):
    """
    The representation of a factory
    """


    # constants
    typename = "Factory"


    # public data
    @property
    def connections(self):
        """
        An iterable of my connections to my slots
        """
        # go through the connectivity table
        for trait, slot in self.slots.items():
            # and build a canonical representation of the connection
            yield self, trait, slot
        # all done
        return


    # interface
    def connect(self, trait, slot):
        """
        Add {slot} as the representative of my {trait}
        """
        # add it to the pile
        self.slots[trait] = slot
        # and let it know
        # N.B.: {slot} depends on {factory} for this update; don't modify without reading through
        # the implementations of both {Factory} and {Slot}
        slot.connect(factory=self, trait=trait)
        # all done
        return


    # metamethods
    def __init__(self, factory, **kwds):
        # chain up
        super().__init__(**kwds)
        # save my product
        self.factory = factory
        # get the factory arity
        self.inputs = len(factory.pyre_inputTraits)
        self.outputs = len(factory.pyre_outputTraits)
        # my connectivity table
        self.slots = {trait: slot for trait,slot in self._allSlots()}
        # all done
        return


    # implementation details
    def _allSlots(self):
        """
        Return all my input and output slots
        """
        # grab my factory
        factory = self.factory
        # make slots for my inputs
        yield from self._makeSlots(traits=factory.pyre_inputTraits, inputs=True)
        # and my outputs
        yield from self._makeSlots(traits=factory.pyre_outputTraits, inputs=False)
        # all done
        return


    def _makeSlots(self, traits, inputs=True):
        """
        Build slots corresponding to all {traits}
        """
        # get my location
        x, y = self.position
        # pick the side of the slots
        side = 1 if inputs else -1
        # realize the {traits}, just in case we were handed a virtual container
        traits = tuple(traits)
        # find out how many traits there are; we use this to position the slots in the diagram
        nTraits = len(traits)
        # go through all {traits}
        for idx, trait in enumerate(traits):
            # make a position for this slot
            position = (x-3*side, y + 2*idx + 1 - nTraits)
            # build an unbound rep
            slot = Slot(product=None, position=position)
            # connect me to it; don't forget that we are in the middle of building the
            # connection table, so it gets updated automatically after we are done here
            slot.connect(factory=self, trait=trait)
            # and publish it
            yield trait, slot
        # all done
        return


# end of file
