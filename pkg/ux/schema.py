# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene
# support
import journal
# the package
import flocor


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


# basic flow entities
class Specification(graphene.ObjectType):
    """
    {Specification} is the protocol that {Product} implements
    """

    # the fields
    family = graphene.String(required=True)

    # the resolvers
    def resolve_family(specification, info, **kwds):
        # easy enough
        return specification.pyre_family()


class Producer(graphene.ObjectType):
    """
    {Producer} is the protocol that {factory} implements
    """

    # the fields
    family = graphene.String(required=True)

    # the resolvers
    def resolve_family(producer, info, **kwds):
        # easy enough
        return producer.pyre_family()


class Catalog(graphene.ObjectType):
    """
    The specifications and producers in a particular package
    """

    # the fields
    producers = graphene.List(Producer, required=True)
    specifications = graphene.List(graphene.NonNull(Specification), required=True)


    # resolvers
    def resolve_producers(catalog, info):
        # get the {pyre} nameserver from the execution context
        ns = info.context["nameserver"]
        # and the package name from the query
        package = catalog["package"]
        # we are looking for producers, all of which sit under {factories}
        factories = ns.join(package, "factories")
        # retrieve the associated protocol
        producer = ns[factories]

        # prime the search
        implementers = producer.pyre_locateAllImplementers(namespace=package)
        # build the pile; some are accessible multiple ways, so eliminate the duplicates
        yield from set(producer for _,_, producer in implementers)

        # all done
        return


    def resolve_specifications(catalog, info):
        # get the {pyre} nameserver from the execution context
        ns = info.context["nameserver"]
        # and the package name from the query
        package = catalog["package"]
        # we are looking for product specifications, all of which sit under {products}
        products = ns.join(package, "products")
        # retrieve the associated protocol
        specification = ns[products]

        # prime the search
        implementers = specification.pyre_locateAllImplementers(namespace=package)
        # build the pile; some are accessible multiple ways, so eliminate the duplicates
        yield from set(spec for _,_, spec in implementers)

        # all done
        return


# the query
class Query(graphene.ObjectType):
    """
    The top level query
    """

    # the fields
    version = graphene.Field(Version, required=True)
    catalog = graphene.Field(Catalog, required=True,
                             package=graphene.String(default_value="flocor"))

    # the resolvers
    # version
    def resolve_version(root, info):
        # get the {version} info from the execution {context} and make it available to the
        # {Version} resolvers
        return info.context["version"]

    # catalog
    def resolve_catalog(root, info, **kwds):
        # this resolver must exist; its job is to build an object that gets handed to the
        # {Catalog} resolvers; here we would prep such an object using the query execution
        # context and the variable bindings in {kwds}, but for {Catalog} this is not necessary
        #
        #     root: should be {None}; this is the root
        #     info: has {.context} with whatever was built by the executioner
        #     kwds: contains the variable bindings for this catalog resolution
        #
        return kwds


# build the schema
schema = graphene.Schema(
    # supported operations
    query=Query,
    # the concrete types in the schema
    types=[
        # administrative
        Version,
        # producers and specifications
        Catalog,
    ]
)


# end of file
