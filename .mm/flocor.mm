# -*- Makefile -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2020 all rights reserved


# flocor consists of a python package
flocor.packages :=
# libraries
flocor.libraries := flocor.lib ${call extern.if.available,cuda,flocor_cuda.lib}
# python extensions
flocor.extensions :=
# a ux bundle
flocor.webpack :=
# and some tests
flocor.tests :=


# load the packages
include $(flocor.packages)
# the libraries
include $(flocor.libraries)
# the extensions
include $(flocor.extensions)
# the ux
include $(flocor.webpack)
# and the test suites
include $(flocor.tests)


# end of file
