# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene

# locals
from .Producer import Producer
from .Specification import Specification


# factories and products from a given package
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


# end of file
