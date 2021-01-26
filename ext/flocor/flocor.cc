// -*- c++ -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// external
#include "external.h"
// namespace setup
#include "forward.h"


// the module entry point
PYBIND11_MODULE(flocor, m)
{
    // the doc string
    m.doc() = "the libflocor bindings";

    // bind the opaque types
    flocor::py::opaque(m);
    // register the exception types
    flocor::py::exceptions(m);

    // bindings for product layouts
    flocor::py::index2d(m);
    flocor::py::shape2d(m);
    flocor::py::layout2d(m);

    // product spec bindings
    flocor::py::slc(m);
}


// end of file
