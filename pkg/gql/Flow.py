# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene

# my interface
from .Node import Node
# local basic types
from .Position import Position
# diagram entities
from .Connector import Connector
from .Factory import Factory
from .Label import Label
from .Slot import Slot
# connections
from .ConnectorConnection import ConnectorConnection
from .FactoryConnection import FactoryConnection
from .LabelConnection import LabelConnection
from .SlotConnection import SlotConnection


# trait types from {pyre.schemata}
class Flow(graphene.ObjectType):
    """
    The container of slots, factories, and their connectors
    """

    # {graphene} metadata
    class Meta:
        # register my interface
        interfaces = Node,

    # metadata
    id = graphene.ID(required=True)
    name = graphene.String(required=True)
    family = graphene.String(required=True)
    # factories
    factories = graphene.relay.ConnectionField(FactoryConnection)
    # slots
    slots = graphene.relay.ConnectionField(SlotConnection)
    # connectors
    connectors = graphene.relay.ConnectionField(ConnectorConnection)
    # labels
    labels = graphene.relay.ConnectionField(LabelConnection)


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

        # return the pile
        return factories


    def resolve_slots(panel, info, **kwds):
        # unpack
        diagram = panel.diagram

        # make a pile
        slots = []
        # slots are the unbound traits of factories
        for slot in diagram.slots:
            # grab its id
            guid = slot.guid
            # check whether it is bound
            bound = False if slot.product is None else True
            # look up its position
            x,y = slot.position
            # represent
            rep = Slot(id=guid, bound=bound, position=Position(x=x, y=y))
            # and add it to the pile
            slots.append(rep)

        # return the pile
        return slots


    def resolve_connectors(panel, info, **kwds):
        # unpack
        diagram = panel.diagram

        # make a pile
        connectors = []
        # all connectors involve slots so go through them
        for node in diagram.slots:
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
                rep = Connector(id=guid, inp=direction, factoryAt=factoryAt, slotAt=nodeAt)
                # and add it to the pile
                connectors.append(rep)

        # return the pile
        return connectors


    def resolve_labels(panel, info, **kwds):
        # unpack
        diagram = panel.diagram

        # make a pile
        labels = []
        # go through the slots in the {diagram}
        for node in diagram.slots:
            # for each label
            for label in node.labels():
                # build a rep for its position
                label["position"] = Position(*label["position"])
                # and one for the label
                rep = Label(**label)
                # and add to the pile
                labels.append(rep)

        # now to extract the factory labels
        # N.B.: in order to avoid double counting, we are only interested in the first
        # entry of the factory label set, which is guaranteed to be the name of the factory.
        # the rest would be labels for its connections that we have already harvested by
        # traversing the all the slots in the diagram, so we'll skip them
        for node in diagram.factories:
            # for each label
            for label in node.labels():
                # build a rep for its position
                label["position"] = Position(*label["position"])
                # and one for the label
                rep = Label(**label)
                # add it to the pile
                labels.append(rep)
                # and bail; the rest are already on the pile
                break

        # return the pile
        return labels


# end of file
