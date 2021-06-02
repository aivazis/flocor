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

    // bindings for layouts
    // 2d
    flocor::py::order2d(m);
    flocor::py::index2d(m);
    flocor::py::shape2d(m);
    flocor::py::layout2d(m);
    // 3d
    flocor::py::order3d(m);
    flocor::py::index3d(m);
    flocor::py::shape3d(m);
    flocor::py::layout3d(m);

    // products
    // grid of pixel coordinates
    flocor::py::covering(m);
    // slc
    flocor::py::slc_metadata(m);
    flocor::py::slc_dataset(m);
    flocor::py::slc_const_dataset(m);

    // factories
    // uniform grid over the bounds of a raster
    flocor::py::uniform_grid(m);
}


// end of file
