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
    // the product spec
    using slc_t = flocor::products::slc_metadata_t;
    // safe pointers
    using slc_pointer = std::unique_ptr<slc_t>;

    // slc layout
    using layout2d_t = products::layout_t<2>;
    // the corresponding shape
    using shape2d_t = layout2d_t::shape_type;
    // and index
    using index2d_t = layout2d_t::index_type;
}


// add bindings for the product spec
void
flocor::py::slc_metadata(py::module & m)
{
    // add the product spec to the package namespace
    auto slc = py::class_<slc_t>(m, "SLCMetadata");

    // constructor from a python tuple
    slc.def(
        py::init([](std::tuple<int, int> pyShape) {
            // unpack
            auto [lines, samples] = pyShape;
            // make a shape
            slc_t::layout_type::shape_type shape { lines, samples };
            // use it to make a layout
            slc_t::layout_type layout { shape };
            // and from there an {slc_t} spec
            auto slc = new slc_t(layout);
            // dress it and return it
            return slc_pointer(slc);
        }),
        // the signature
        "shape"_a);

    // constructor from a shape
    slc.def(
        py::init([](const shape2d_t & shape) {
            // make a layout
            slc_t::layout_type layout { shape };
            // and from that an {slc_t} spec
            auto slc = new slc_t(layout);
            // dress it and return it
            return slc_pointer(slc);
        }),
        // the signature
        "shape"_a);

    // accessors
    // memory footprint of a single pixel
    slc.def_property_readonly_static(
        "bytesPerPixel",
        // the getter
        [](py::object) {
            // easy enough
            return sizeof(slc_t::pixel_type);
        },
        // the docstring
        "the memory footprint of an SLC pixel, in bytes");

    // the shape
    slc.def_property_readonly(
        "shape",
        // the getter
        [](const slc_t & slc) { return slc.layout().shape(); },
        // the docstring
        "the shape of the spec");


    // all done
    return;
}


// end of file
