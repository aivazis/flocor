# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene
# get access to my package metadata
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


    # resolvers
    def resolve_major(parent, info):
        """
        Return the package major version
        """
        return flocor.meta.major


    def resolve_minor(parent, info):
        """
        Return the package minor version
        """
        return flocor.meta.minor


    def resolve_micro(parent, info):
        """
        Return the package micro version
        """
        return flocor.meta.micro


    def resolve_revid(parent, info):
        """
        Return the package revision id
        """
        return flocor.meta.revision


# end of file
