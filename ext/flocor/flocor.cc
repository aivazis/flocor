// -*- c++ -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// external
#include "external.h"
// namespace setup
#include "forward.h"


// the module entry point
PYBIND11_MODULE(flocor, m) {
    // the doc string
    m.doc() = "the libflocor bindings";

    // bind the opaque types
    flocor::py::opaque(m);
    // register the exception types
    flocor::py::exceptions(m);
}


// end of file
