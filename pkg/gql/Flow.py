# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene
import itertools

# my interface
from .Node import Node
# local basic types
from .Factory import Factory
from .Product import Product
from .Slot import Slot
from .Position import Position
# connections
from .FactoryConnection import FactoryConnection
from .ProductConnection import ProductConnection
from .SlotConnection import SlotConnection


# trait types from {pyre.schemata}
class Flow(graphene.ObjectType):
    """
    The container of products, factories, and their bindings
    """

    # {graphene} metadata
    class Meta:
        # register my interface
        interfaces = Node,

    # metadata
    id = graphene.ID(required=True)
    name = graphene.String(required=True)
    family = graphene.String(required=True)
    # products
    products = graphene.relay.ConnectionField(ProductConnection)
    # factories
    factories = graphene.relay.ConnectionField(FactoryConnection)
    # slots
    slots = graphene.relay.ConnectionField(SlotConnection)


    # resolvers
    def resolve_id(panel, info, **kwds):
        # unpack
        flow = panel.flow
        # return the {flow} id
        return f"Flow:{flow.pyre_id}"


    def resolve_name(panel, info, **kwds):
        # unpack
        flow = panel.flow
        # return the {flow} name
        return flow.pyre_name


    def resolve_family(panel, info, **kwds):
        # unpack
        flow = panel.flow
        # return the {flow} family name
        return flow.pyre_family()


    def resolve_factories(panel, info, **kwds):
        # unpack
        flow = panel.flow
        layout = panel.layout

        # make a pile
        factories = []
        # go through the factories in {flow}
        for node in flow.factories:
            # get the id
            guid = node.pyre_id

            # get the inputs
            inputs = node.pyre_inputTraits
            # find out how many there are
            nInputs = len(inputs)
            # now, the outputs
            outputs = node.pyre_outputTraits
            # find out how many there are
            nOutputs = len(outputs)

            # look up its position
            position = layout[guid]
            # unpack
            x = position["x"]
            y = position["y"]
            # represent
            factory = Factory(id=f"Factory:{guid}",
                        name=node.pyre_name, family=node.pyre_family(),
                        inputs=nInputs, outputs=nOutputs,
                        position=Position(x=x, y=y))
            # and add to the pile
            factories.append(factory)

        # return the pile
        return factories


    def resolve_products(panel, info, **kwds):
        # unpack
        flow = panel.flow
        layout = panel.layout

        # make a pile
        products = []
        # go through the products in {flow}
        for node in flow.products:
            # grab its id
            guid = node.pyre_id
            # look up its position
            position = layout[guid]
            # unpack
            x = position["x"]
            y = position["y"]
            # represent
            product = Product(id=f"Product:{guid}",
                        name=node.pyre_name, family=node.pyre_family(),
                        position=Position(x=x, y=y))
            # and add to the pile
            products.append(product)

        # return the pile
        return products


    def resolve_slots(panel, info, **kwds):
        # unpack
        flow = panel.flow
        layout = panel.layout

        # make a pile
        slots = []
        # slots are the unbound traits of factories, so go through all known factories
        for node in flow.factories:
            # grab all their relevant traits
            traits = itertools.chain(node.pyre_inputTraits, node.pyre_outputTraits)
            # and go through them
            for trait in traits:
                # get the trait slot
                slot = node.pyre_inventory[trait]
                # get the id
                guid = slot.pyre_id
                # look up its position
                position = layout[guid]
                # unpack
                x = position["x"]
                y = position["y"]
                # represent
                rep = Slot(id=f"Slot:{guid}",
                           name=trait.name, family=trait.typename,
                           position=Position(x=x, y=y))
                # and add it to the pile
                slots.append(rep)

        # return the pile
        return slots


# end of file
