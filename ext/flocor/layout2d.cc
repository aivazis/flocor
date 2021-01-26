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
    // and index
    using index2d_t = layout2d_t::index_type;
}


// add bindings for the grid layouts used in this package
void
flocor::py::layout2d(py::module & m)
{
    // 2d layouts
    auto layout2d = py::class_<layout2d_t>(m, "Layout2D");
    // their shapes
    auto shape2d = py::class_<shape2d_t>(m, "Shape2D");
    // and their indices
    auto index2d = py::class_<index2d_t>(m, "Index2D");

    // populate {Shape2D}
    // constructor
    shape2d.def(
        // convert python tuples into shapes
        py::init([](std::tuple<int, int> pyShape) {
            // unpack
            auto [s0, s1] = pyShape;
            // build a shape and return it
            return new layout2d_t::shape_type(s0, s1);
        }),
        // the signature
        "shape"_a);

    // rank
    shape2d.def_property_readonly_static(
        // the name of the property
        "rank",
        // the getter
        [](py::object) { return shape2d_t::rank(); },
        // the docstring
        "the number of cells in this shape");

    // number of cells
    shape2d.def_property_readonly(
        // the name of the property
        "cells",
        // the getter
        &shape2d_t::cells,
        // the docstring
        "the number of cells in this shape");

    // access to individual ranks
    shape2d.def(
        // the name of the method
        "__getitem__",
        // the getter
        [](const shape2d_t & shape, int idx) { return shape [idx]; },
        // the signature
        "index"_a,
        // the docstring
        "get the value of a given rank");

    // iteration support
    shape2d.def(
        // the name of the method
        "__iter__",
        // the implementation
        [](const shape2d_t & shape) { return py::make_iterator(shape.begin(), shape.end()); },
        // the docstring
        "iterate over the ranks",
        // make sure the shape lives long enough
        py::keep_alive<0, 1>());

    // all done
    return;
}


// end of file
