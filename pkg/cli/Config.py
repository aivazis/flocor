# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# support
import flocor


# declaration
class Config(flocor.shells.command, family="flocor.cli.config"):
    """
    Display configuration information about this package
    """


    # version info
    @flocor.export(tip="the version information")
    def version(self, **kwds):
        """
        Print the version of the flocor package
        """
        # print the version number
        print(f"{flocor.meta.version}")
        # all done
        return 0


    # configuration
    @flocor.export(tip="the top level installation directory")
    def prefix(self, **kwds):
        """
        Print the top level installation directory
        """
        # print the installation location
        print(f"{flocor.prefix}")
        # all done
        return 0


    @flocor.export(tip="the directory with the executable scripts")
    def path(self, **kwds):
        """
        Print the location of the executable scripts
        """
        # print the path to the bin directory
        print(f"{flocor.prefix}/bin")
        # all done
        return 0


    @flocor.export(tip="the directory with the python packages")
    def pythonpath(self, **kwds):
        """
        Print the directory with the python packages
        """
        # print the path to the python package
        print(f"{flocor.home.parent}")
        # all done
        return 0


    @flocor.export(tip="the location of the {flocor} headers")
    def incpath(self, **kwds):
        """
        Print the locations of the {flocor} headers
        """
        # print the path to the headers
        print(f"{flocor.prefix}/include")
        # all done
        return 0


    @flocor.export(tip="the location of the {flocor} libraries")
    def libpath(self, **kwds):
        """
        Print the locations of the {flocor} libraries
        """
        # print the path to the libraries
        print(f"{flocor.prefix}/lib")
        # all done
        return 0


# end of file
