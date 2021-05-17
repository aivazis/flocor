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
        # return the pile
        return list(diagram.factories)


    def resolve_slots(panel, info, **kwds):
        # unpack
        diagram = panel.diagram
        # return the pile of slots
        return list(diagram.slots)


    def resolve_connectors(panel, info, **kwds):
        # unpack
        diagram = panel.diagram
        # return the pile of connectors
        return list(diagram.connectors)


    def resolve_labels(panel, info, **kwds):
        # unpack
        diagram = panel.diagram

        # initialize a pile with all the diagram labels
        labels = list(diagram.labels)

        # go through all the factories
        for factory in diagram.factories:
            # and add their labels to the pile
            labels.extend(factory.labels)

        # go through all the slots
        for slot in diagram.slots:
            # add their labels to the pile
            labels.extend(slot.labels)
            # go through their connections
            for connector in slot.connections():
                # and add the connector labels to the pile
                labels.extend(connector.labels)

        # return the pile of labels
        return labels


# end of file
