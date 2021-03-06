// -*- c++ -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
#include "../external.h"
// namespace setup
#include "../forward.h"


// add bindings for the grid layouts used in this package
void
flocor::py::index2d(py::module & m)
{
    // the index
    auto indexCls = py::class_<index2d_t>(m, "Index2D");

    // populate {Shape2D}
    // constructor
    indexCls.def(
        // convert python tuples into indices
        py::init([](std::tuple<int, int> pyIndex) {
            // unpack
            auto [s0, s1] = pyIndex;
            // build an index and return it
            return new layout2d_t::index_type(s0, s1);
        }),
        // the signature
        "index"_a);

    // rank
    indexCls.def_property_readonly_static(
        // the name of the property
        "rank",
        // the getter
        [](py::object) { return index2d_t::rank(); },
        // the docstring
        "the number of entries this index");

    // access to individual ranks
    indexCls.def(
        // the name of the method
        "__getitem__",
        // the getter
        [](const index2d_t & index, int idx) { return index [idx]; },
        // the signature
        "index"_a,
        // the docstring
        "get the value of a given rank");

    // iteration support
    indexCls.def(
        // the name of the method
        "__iter__",
        // the implementation
        [](const index2d_t & index) { return py::make_iterator(index.begin(), index.end()); },
        // the docstring
        "iterate over the ranks",
        // make sure the index lives long enough
        py::keep_alive<0, 1>());

    // string representation
    indexCls.def(
        // the name of the method
        "__str__",
        // the implementation
        [](const index2d_t & index) {
            // make a buffer
            std::stringstream buffer;
            // inject my value
            buffer << index;
            // and return the value
            return buffer.str();
        },
        // the docstring
        "generate a string representation");

    // all done
    return;
}


// end of file
