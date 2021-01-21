# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import flocor


# declaration
class About(flocor.shells.command, family='flocor.cli.about'):
    """
    Display information about this application
    """


    @flocor.export(tip="print the copyright note")
    def copyright(self, plexus, **kwds):
        """
        Print the copyright note of the flocor package
        """
        # show the copyright note
        plexus.info.log(flocor.meta.copyright)
        # all done
        return


    @flocor.export(tip="print out the acknowledgments")
    def credits(self, plexus, **kwds):
        """
        Print out the license and terms of use of the flocor package
        """
        # make some space
        plexus.info.log(flocor.meta.header)
        # all done
        return


    @flocor.export(tip="print out the license and terms of use")
    def license(self, plexus, **kwds):
        """
        Print out the license and terms of use of the flocor package
        """
        # make some space
        plexus.info.log(flocor.meta.license)
        # all done
        return


    @flocor.export(tip="print the version number")
    def version(self, plexus, **kwds):
        """
        Print the version of the flocor package
        """
        # make some space
        plexus.info.log(flocor.meta.header)
        # all done
        return


# end of file
