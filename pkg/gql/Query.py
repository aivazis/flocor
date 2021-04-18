# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene
import journal

# the basic node interface
from .Node import Node
# local types
# server version tag
from .Version import Version
# flow nodes
from .Flow import Flow
from .Specification import Specification
from .Producer import Producer
from .Slot import Slot
# flow aware packages
from .Catalog import Catalog


# the query
class Query(graphene.ObjectType):
    """
    The top level query
    """


    # the fields
    # node lookup
    node = Node.Field()
    # the flow graph
    flow = graphene.Field(Flow, required=True,
                          name=graphene.String(default_value=""))

    # basic flow nodes from {pyre.calc}
    # variables
    calcVariables = graphene.List(graphene.NonNull(Specification))
    # operators
    calcOperators = graphene.List(graphene.NonNull(Producer))

    # factories and products from a package
    catalog = graphene.Field(Catalog, required=True,
                             package=graphene.String(default_value="flocor"))
    # server version info
    version = graphene.Field(Version, required=True)


    # the resolvers
    # the flow
    def resolve_flow(root, info, **kwds):
        """
        Generate a representation of the current workflow
        """
        # get the panel
        panel = info.context["panel"]
        # and pass it on
        return panel


    # variables from {pyre.calc}
    def resolve_calcVariables(root, info, **kwds):
        """
        Generate a list of {pyre.calc} variables
        """
        # get {schemata} from pyre
        import pyre.schemata
        # make a list of the basic variable types from {pyre.calc}
        variables = [
            # the basic
            Specification(family=f"pyre.calc.{pyre.schemata.bool.typename}"),
            Specification(family=f"pyre.calc.{pyre.schemata.str.typename}"),
            Specification(family=f"pyre.calc.{pyre.schemata.int.typename}"),
            Specification(family=f"pyre.calc.{pyre.schemata.float.typename}"),
            Specification(family=f"pyre.calc.{pyre.schemata.complex.typename}"),
            # composites
            Specification(family=f"pyre.calc.{pyre.schemata.path.typename}"),
            Specification(family=f"pyre.calc.{pyre.schemata.dimensional.typename}"),
            Specification(family=f"pyre.calc.{pyre.schemata.date.typename}"),
            Specification(family=f"pyre.calc.{pyre.schemata.time.typename}"),
            Specification(family=f"pyre.calc.{pyre.schemata.timestamp.typename}"),
            # higher level types
            Specification(family=f"pyre.calc.{pyre.schemata.istream.typename}"),
            Specification(family=f"pyre.calc.{pyre.schemata.ostream.typename}"),
            Specification(family=f"pyre.calc.{pyre.schemata.envvar.typename}"),
        ]

        # and return them
        return variables


    # operators from {pyre.calc}
    def resolve_calcOperators(root, info, **kwds):
        """
        Generate a list of {pyre.calc} operators
        """
        # pick some names
        names = "add", "sub", "mul", "div"

        # and make a pile
        operators = [
            # of producers
            Producer(
                # with a type derived form their name
                family=f"pyre.calc.{name}",
                # that are binary operators
                inputs=[
                    Slot(name="op1", spec=Specification(family="pyre.calc.object")),
                    Slot(name="op2", spec=Specification(family="pyre.calc.object"))
                ],
                # that return a single value
                outputs = [
                    Slot(name="value", spec=Specification(family="pyre.calc.object"))
                ]
            )
            # out of their names
            for name in names
        ]
        # and return it
        return operators


    # catalog
    def resolve_catalog(root, info, **kwds):
        """
        Generate a list of all known specifications and producers in a given package
        """
        # this resolver must exist; its job is to build an object that gets handed to the
        # {Catalog} resolvers; here we would prep such an object using the query execution
        # context and the variable bindings in {kwds}, but for {Catalog} this is not necessary
        #
        #     root: should be {None}; this is the root
        #     info: has {.context} with whatever was built by the executioner
        #     kwds: contains the variable bindings for this catalog resolution
        #
        return kwds


    # version
    def resolve_version(root, info):
        """
        Build and return the server version
        """
        # prep an empty context for the {version} resolution
        return {}


# end of file
