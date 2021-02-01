# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene
# the package
import flocor


# the abstractions
class Node(graphene.relay.Node):
    """
    Requirements of all flow nodes
    """

    class Meta:
        name = "Node"

    # all pyre components have a name
    name = graphene.String(required=True)
    # and a family
    family = graphene.String(required=True)

    @staticmethod
    def to_global_id(type_, id):
        print(f"Node.to_global_id: type:{type_}, id={id}")
        raise NotImplementedError("NYI!")

    @staticmethod
    def get_node_from_global_id(info, global_id, only_type=None):
        print(f"Node.get_node_from_gloabl_id: info:{info}, global_id:{global_id}")
        raise NotImplementedError("NYI!")


# the server version
class Version(graphene.ObjectType):
    """
    The server version
    """

    # the fields
    major = graphene.Int(required=True)
    minor = graphene.Int(required=True)
    micro = graphene.Int(required=True)
    revid = graphene.String(required=True)


# the query
class Query(graphene.ObjectType):
    """
    The top level query
    """

    # the fields
    node = Node.Field()
    version = graphene.Field(Version, required=True)

    # the resolver
    def resolve_version(root, info):
        # get the version from the context
        return info.context.get("version")


# build the schema
schema = graphene.Schema(
    # supported operations
    query=Query,
    # the concrete types in the schema
    types=[
        # administrative
        Version,
    ]
)


# end of file
