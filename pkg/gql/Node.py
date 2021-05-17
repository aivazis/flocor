# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene

# local types
from .Position import Position


# a flow node that represents a typed+named variable
class Node(graphene.relay.Node):
    """
    Specification for a base flow node
    """

    # register this as the {graphene.relay.Node} replacement
    class Meta:
        name = "Node"


    # the basic fields
    id = graphene.ID()
    # representation
    position = graphene.Field(Position, required=True)


    #  {graphene} hooks
    @classmethod
    def resolve_type(cls, entity, *_):
        """
        Type recognizer that converts diagram entities to {graphene} nodes
        """
        # if the node is a factory
        if entity.typename == "Factory":
            # get the class
            from .Factory import Factory
            # and return it
            return Factory

        # if it is a slot
        if entity.typename == "Slot":
            # get the class
            from .Slot import Slot
            # and return it
            return Slot

        # if it is a label
        if entity.typename == "Label":
            # get the class
            from .Label import Label
            # and return it
            return Label

        # if it is a connector
        if entity.typename in ["Input", "Output"]:
            # get the class
            from .Connector import Connector
            # and return it
            return Connector

        # anything else is a problem
        import journal
        # that's almost certainly a bug
        channel = journal.firewall("flocor.gql.schema")
        # and complain
        channel.log(f"while moving {entity}: unknown type '{entity.typename}'")
        # and, just in case firewalls are not fatal, send a generic node back
        return Node


    @staticmethod
    def to_global_id(gtype, eid):
        """
        Encode the {type} and {id} of a {node} implementor
        """
        # just splice them together
        return f"{gtype}:{eid}"


    @staticmethod
    def get_node_from_global_id(info, gid, only_type=None):
        """
        Look up and return a node instance based on its type and id as encoded in {gid}
        """
        # unpack
        gtype, _id = gid.split(":")
        # if the caller provided a type constraint that can't be satisfied
        if only_type and gtype != only_type:
            # get the journal
            import journal
            # treat this as a bug, for now
            channel = journal.firewall("flocor.gql.node")
            # and complain
            channel.log(f"incompatible types: expected {only_type}, got {gtype}")

        # map the typename to the known types
        # leave blank for now, until we know under what conditions this gets invoked
        # the firewall below will ring when that happens

        # anything else is a bug
        import journal
        # make a channel
        channel = journal.firewall("flocor.gql.node")
        # and complain
        channel.log(f"while resolving {gid}: unknown type {gtype}")

        # UNREACHABLE
        return


# end of file
