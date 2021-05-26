# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import flocor


# declaration
class List(flocor.shells.command, family='flocor.cli.about'):
    """
    Display information about factories and product
    """

    # user configurable state
    package = flocor.properties.str()
    package.default = "flocor.calc"
    package.doc = "the name of the package to look up"


    @flocor.export(tip="print the list of known factories")
    def factories(self, plexus, **kwds):
        """
        Print the known factories
        """
        # get the target package name
        package = self.package
        # get the name server
        ns = self.pyre_nameserver
        # look up the factory protocol that owns the namespace
        factory = ns[f"{package}.factories"]
        # locate the implementers
        implementers = factory.pyre_locateAllImplementers(namespace="flocor")

        # make a pile
        factories = set(factory for _, _, factory in implementers)

        # grab a channel
        channel = plexus.info
        # sign on
        channel.line("factories:")
        # go through the names
        for factory in factories:
            # and print them out
            channel.line(f"  {factory}")
        # and flush
        channel.log()

        # all done
        return


    @flocor.export(tip="print the list of known products")
    def products(self, plexus, **kwds):
        """
        Print the known factories
        """
        # get the target package name
        package = self.package
        # get the name server
        ns = self.pyre_nameserver
        # look up the generic SLC factory protocol
        slc = ns[f"{package}.products"]

        # the locator of implementers
        implementers = slc.pyre_locateAllImplementers(namespace="flocor")
        # make a pile
        products = set(product for _, _, product in implementers)

        # grab a channel
        channel = plexus.info
        # sign on
        channel.line("data products:")
        # go through the names
        for product in products:
            # and print them out
            channel.line(f"  {product}")
        # and flush
        channel.log()

        # all done
        return


# end of file
