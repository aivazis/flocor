// -*- c++ -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
#include "../external.h"
// namespace setup
#include "../forward.h"
// libflocor
#include <flocor/products.h>


// type aliases
namespace flocor::py {
    // a 2d grid of pixel coordinates, stored on the heap
    using covering_t = flocor::products::covering_t;
}


// add the bindings
void
flocor::py::covering(py::module & m)
{
    // make the class
    auto cls = py::class_<covering_t>(m, "Covering");

    // constructor
    cls.def(
        // the wrapper
        py::init([](std::tuple<int, int> pyShape) {
            // unpack
            auto [s0, s1] = pyShape;
            // build a shape
            covering_t::shape_type shape(s0, s1);
            // use it to build a layout
            covering_t::packing_type layout(shape);
            // build a grid and return it
            return new covering_t(layout, layout.cells());
        }),
        // the signature
        "shape"_a);

    // layout
    cls.def_property_readonly(
        "layout",
        // the getter
        &covering_t::layout,
        // the docstring
        "the covering layout");

    // indexing
    cls.def(
        "__getitem__",
        // convert the incoming tuple into an index and fetch the data
        [](covering_t & cov, std::tuple<int, int> idx) -> covering_t::value_type & {
            // unpack
            auto [idx0, idx1] = idx;
            // make an index
            covering_t::index_type index(idx0, idx1);
            // get the data and return it
            return cov[index];
        },
        // the signature
        "index"_a,
        // the docstring
        "access the data at the given index",
        // grant write access
        py::return_value_policy::reference);

    // data read access given an offset
    cls.def(
        "__getitem__",
        // delegate directly to the {slc_dataset_t}
        [](covering_t & cov, size_t offset) -> covering_t::value_type & {
            // this one is easy enough
            return cov[offset];
        },
        // the signature
        "offset"_a,
        // the docstring
        "access the data at the given offset",
        // grant write access
        py::return_value_policy::reference);

    // all done
    return;
}


// end of file
