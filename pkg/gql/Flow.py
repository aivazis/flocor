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
from .Connector import Connector
from .Factory import Factory
from .Product import Product
from .Slot import Slot
from .Position import Position
# connections
from .ConnectorConnection import ConnectorConnection
from .FactoryConnection import FactoryConnection
from .ProductConnection import ProductConnection
from .SlotConnection import SlotConnection


# trait types from {pyre.schemata}
class Flow(graphene.ObjectType):
    """
    The container of products, factories, and their connectors
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
    # connectors
    connectors = graphene.relay.ConnectionField(ConnectorConnection)


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
        diagram = panel.diagram

        # make a pile
        factories = []
        # go through the factories in the {diagram}
        for node in diagram.factories:
            # get its id
            guid = node.guid
            # its name
            name = node.factory.pyre_name
            # its family
            family = node.factory.pyre_family()
            # its arity
            inputs = node.inputs
            outputs = node.outputs
            # look up its position
            x,y = node.position
            # represent
            factory = Factory(id=guid,
                        name=name, family=family,
                        inputs=inputs, outputs=outputs,
                        position=Position(x=x, y=y))
            # and add to the pile
            factories.append(factory)

        print(f"factories:")
        for _ in diagram.factories:
            print(f"  {_}")

        # return the pile
        return factories


    def resolve_products(panel, info, **kwds):
        # unpack
        diagram = panel.diagram

        # make a pile
        products = []
        # go through the products in {flow}
        for node in diagram.products:
            # grab its id
            guid = node.guid
            # its name
            name = node.product.pyre_name
            # its family
            family = node.product.pyre_family()
            # look up its position
            x,y = node.position
            # represent
            product = Product(id=guid,
                        name=name, family=family,
                        position=Position(x=x, y=y))
            # and add to the pile
            products.append(product)

        print(f"products:")
        for _ in diagram.products:
            print(f"  {_}")

        # return the pile
        return products


    def resolve_slots(panel, info, **kwds):
        # unpack
        diagram = panel.diagram

        # make a pile
        slots = []
        # slots are the unbound traits of factories
        for slot in diagram.slots:
            # grab its id
            guid = slot.guid
            # look up its position
            x,y = slot.position
            # represent
            rep = Slot(id=guid, position=Position(x=x, y=y))
            # and add it to the pile
            slots.append(rep)

        print(f"slots:")
        for _ in diagram.slots:
            print(f"  {_}")

        # return the pile
        return slots


    def resolve_connectors(panel, info, **kwds):
        # unpack
        diagram = panel.diagram

        # make a pile
        connectors = []
        # all connectors involve slots and products, so go through them
        for node in itertools.chain(diagram.products, diagram.slots):
            # unpack the node position
            nx, ny = node.position
            # make a rep for the node position
            nodeAt = Position(x=nx, y=ny)
            # each node has a pile of connections
            for factory, trait in node.connectors:
                # make a connector id
                guid = f"Connector:{factory.pyre_id}|{node.pyre_id}"
                # unpack the factory position
                fx, fy = factory.position
                # make a rep for the factory position
                factoryAt = Position(x=fx, y=fy)
                # deduce the direction
                direction = trait.input
                # build the rep
                rep = Connector(id=guid, inp=direction, factoryAt=factoryAt, productAt=nodeAt)
                # and add it to the pile
                connectors.append(rep)

        # return the pile
        print(f"connectors:")
        for _ in connectors:
            print(f"  {_.id}")

        return connectors


# end of file
