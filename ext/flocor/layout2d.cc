// -*- c++ -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
#include "external.h"
// namespace setup
#include "forward.h"
// libflocor
#include <flocor/products.h>


// type aliases
namespace flocor::py {
    // 2d layouts
    using layout2d_t = products::layout_t<2>;
    // the corresponding shape
    using shape2d_t = layout2d_t::shape_type;
    // and the index
    using index2d_t = layout2d_t::index_type;
}


// add bindings for the grid layouts used in this package
void
flocor::py::layout2d(py::module & m)
{
    // 2d layouts
    auto layout = py::class_<layout2d_t>(m, "Layout2D");

    // constructors
    // from a shape
    layout.def(
        // the handler
        py::init<const shape2d_t &>(),
        // the signature
        "shape"_a);

    // from a shape and an origin
    layout.def(
        // the handler
        py::init<const shape2d_t &, const index2d_t &>(),
        // the signature
        "shape"_a, "origin"_a);

    // accessors
    // my shape
    layout.def_property_readonly(
        // the name
        "shape",
        // the getter
        &layout2d_t::shape,
        // the docstring
        "get my shape");

    // my origin
    layout.def_property_readonly(
        // the name
        "origin",
        // the getter
        &layout2d_t::origin,
        // the docstring
        "get my origin");

    // all done
    return;
}


// end of file
