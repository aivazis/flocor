# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import flocor


# declaration
class Debug(flocor.shells.command, family='flocor.cli.debug'):
    """
    Display debugging information about this application
    """


    # user configurable state
    prefix = flocor.properties.str()
    prefix.tip = "specify the portion of the namespace to display"


    @flocor.export(tip="dump the application configuration namespace")
    def nfs(self, plexus, **kwds):
        """
        Dump the application configuration namespace
        """
        # get the prefix
        prefix = self.prefix or "flocor"
        # show me
        plexus.pyre_nameserver.dump(prefix)
        # all done
        return 0


    @flocor.export(tip="dump the application configuration namespace")
    def vfs(self, plexus, **kwds):
        """
        Dump the application virtual filesystem
        """
        # get the prefix
        prefix = self.prefix or '/flocor'
        # build the report
        report = '\n'.join(plexus.vfs[prefix].dump())
        # sign in
        plexus.info.line('vfs: prefix={!r}'.format(prefix))
        # dump
        plexus.info.log(report)
        # all done
        return 0


# end of file
