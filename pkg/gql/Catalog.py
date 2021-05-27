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
    def resolve_producers(variables, info):
        # get the {pyre} name server from the execution context
        ns = info.context["nameserver"]
        # and the package name from the query
        package = variables["package"]
        # we are looking for producers, all of which sit under {factories}
        key = ns.join(package, "factories")
        # retrieve the associated protocol
        producer = ns[key]

        # prime the search
        factories = producer.pyre_locateAllImplementers(namespace="flocor")
        # build the pile; some are accessible multiple ways, so eliminate the duplicates
        yield from sorted(set(factory for _,_, factory in factories),
                          key=lambda factory: factory.pyre_family())

        # all done
        return


    def resolve_specifications(variables, info):
        # get the {pyre} name server from the execution context
        ns = info.context["nameserver"]
        # and the package name from the query
        package = variables["package"]
        # we are looking for product specifications, all of which sit under {products}
        key = ns.join(package, "products")
        # retrieve the associated protocol
        specification = ns[key]

        # prime the search
        products = specification.pyre_locateAllImplementers(namespace="flocor")
        # build the pile; some are accessible multiple ways, so eliminate the duplicates
        yield from sorted(set(product for _,_, product in products),
                          key=lambda product: product.pyre_family())

        # all done
        return


# end of file
