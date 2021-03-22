# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import graphene
import journal
import json
# support
import flocor


# the {graphql} request handler
class GraphQL:


    # interface
    def respond(self, plexus, server, request, **kwds):
        """
        Resolve the {query} and generate a response for the client
        """
        # parse the {request} payload
        payload = json.loads(b'\n'.join(request.payload))
        # get the query
        query = payload.get("query")
        # extract the variables
        variables = payload.get("variables")
        # there are also other fields that we don't care about just yet
        # operation = payload.get("operation")

        # show me
        # print(f"{query=}, {variables=}")

        # get my context and make a copy of it
        context = dict(self.context)
        # place additional information in it
        context["plexus"] = plexus
        context["server"] = server
        context["request"] = request

        # execute the query
        result = self.schema.execute(query, context=context, variables=variables)

        # assemble the resulting document
        doc = { "data": result.data }
        # in addition, if something went wrong
        if result.errors:
            # inform the client by placing the error messages in the resulting payload
            doc["errors"] = [ {"message": error.message} for error in result.errors ]

            # grab my channel
            channel = self.error
            # and generate a report for my console by going through the errors
            for error in result.errors:
                # and reporting each one
                channel.line(error.message)
            # flush
            channel.log()

        # encode the query result using JSON and serve it
        return server.documents.JSON(server=server, value=doc)


    # metamethods
    def __init__(self, panel, **kwds):
        # chain up
        super().__init__(**kwds)

        # load my schema and attach it
        self.schema = flocor.gql.schema

        # set up the execution context
        self.context = {
            "panel": panel,
            "nameserver": panel.pyre_nameserver,
        }

        # make an error channel for my query errors
        self.error = journal.error("flocor.gql.graphql")
        # make sure it's not fatal; skip for now so i don't have to kill
        # the server manually during debugging
        # self.error.fatal = False

        # all done
        return


# end of file
