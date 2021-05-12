# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import collections
import uuid


# the base entity
class Node:
    """
    The base class for diagram entities
    """

    # constants
    typename = "Node"


    # public data
    @property
    def guid(self):
        # build a {relay} node id
        return f"{self.typename}:{self.pyre_id}"


    @property
    def connections(self):
        """
        An iterable of my connections to factories
        """
        # i have node
        return []


    @property
    def labels(self):
        """
        Generate a label for this node
        """
        # the connector between a given slot/factory pair may represent the binding of multiple
        # traits to the same slot, e.g. when both operands of {add} are connected to the same
        # input. we want the connector label to reflect the names of all traits that are mapped
        # to their slot
        uniq = collections.defaultdict(list)
        # go through the my connectivity table
        for factory, trait, slot in self.connections:
            # and add this relation to the table; we form the key using not only the
            # {factory}/{slot} pair, but the trait category as well so that we can distinguish
            # inputs and outputs, just in case we ever allow complicate diagram topologies
            uniq[(factory,slot,trait.input)].append(trait)

        # now, go through the table
        for (factory, slot, category), traits in uniq.items():
            # get the factory position
            _, fy = factory.position
            # and the slot position
            sx, sy = slot.position
            # build the label position
            lx = sx + (1 if category else -1)
            ly = sy + (0.5 if sy > fy else -0.25)
            # pack and make available
            yield {
               "id": f"Connector:{factory.pyre_id}|{slot.pyre_id}-label",
               "value": tuple(sorted(trait.name for trait in traits)),
               "category": "input" if category else "output",
               "position": (lx, ly)
            }
        # all done
        return


    # metamethods
    def __init__(self, position, name=None, **kwds):
        # chain up
        super().__init__(**kwds)
        # all nodes have their own ids
        self.pyre_id = uuid.uuid1()
        # record my name
        self.name = name
        # save the position
        self.position = position
        # all done
        return


    def __str__(self):
        # build my name
        name = f" {self.name}" if self.name is not None else ""
        # render my {typename} and my {uuid}
        return f"{self.typename}{name} '{self.pyre_id}'"


# end of file
