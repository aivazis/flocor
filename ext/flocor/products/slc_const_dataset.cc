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
    // the dataset
    using slc_const_dataset_t = flocor::products::slc_const_dataset_t;

    // its parts
    using value_t = slc_const_dataset_t::value_type;
}

// helpers
namespace flocor::py {
    // the constructor
    inline auto slc_const_dataset_constructor(py::tuple, py::object)
        -> unique_pointer<slc_const_dataset_t>;
}


// add bindings to SLC datasets
void
flocor::py::slc_const_dataset(py::module & m)
{
    // the SLC interface
    auto cls = py::class_<slc_const_dataset_t>(m, "SLCConstDataset");

    // constructor
    cls.def(
        // the constructor wrapper
        py::init([](py::tuple shape, py::object uri) {
            return slc_const_dataset_constructor(shape, uri);
        }),
        // the signature
        "shape"_a, "uri"_a);

    // accessors
    // layout
    cls.def_property_readonly(
        "layout",
        // the getter
        &slc_const_dataset_t::layout,
        // the docstring
        "the SLC layout");

    // sizes of things: number of pixels
    cls.def_property_readonly(
        "cells",
        // the getter
        &slc_const_dataset_t::cells,
        // the docstring
        "the number of pixels in the SLC");

    // sizes of things: memory footprint
    cls.def_property_readonly(
        "bytes",
        // the getter
        &slc_const_dataset_t::bytes,
        // the docstring
        "the amount of memory occupied by this SLC, in bytes");

    // access to the shape
    cls.def_property_readonly(
        "tile",
        // the getter
        [](const slc_const_dataset_t & slc) {
            // get the shape
            auto shape = slc.layout().shape();
            // convert it to a tuple
            auto pyShape = py::make_tuple(shape[0], shape[1]);
            // get the tile from {pyre.grid}
            auto pyFactory = py::module::import("pyre.grid").attr("tile");
            // invoke it
            auto pyTile = pyFactory("shape"_a = pyShape);
            // and return it
            return pyTile;
        },
        // the docstring
        "the shape of the SLC");

    // compute the range of values in the dataset
    cls.def_property_readonly(
        "range",
        // the getter
        [](const slc_const_dataset_t & slc) {
            // the sampling fraction
            auto skip = 1000;
            // get the number of pixels
            auto pixels = slc.cells();
            // the normalization factor
            auto samples = (1.0 * pixels) / skip;

            // initialize the values; don't bother with square roots for now
            auto av2 = std::norm(slc[0]);
            // sample the dataset
            for (auto i = 0; i < pixels; i += skip) {
                // accumulate the value
                av2 += std::norm(slc[i]) / samples;
            }

            //  get the variance
            auto var = std::sqrt(av2);
            // set a scale
            auto scale = 5.0;

            // build the answer and return
            return std::pair(var / scale, scale * var);
        },
        //   the docstring
        "compute the range of values in the dataset");

    // metamethods
    // data read access given an index
    cls.def(
        "__getitem__",
        // convert the incoming tuple into an index and fetch the data
        [](const slc_const_dataset_t & slc, py::tuple pyIdx) {
            // type aliases
            using index_t = slc_const_dataset_t::index_type;
            using rank_t = slc_const_dataset_t::index_type::rank_type;
            // make an index out of the python tuple
            index_t idx { pyIdx[0].cast<rank_t>(), pyIdx[1].cast<rank_t>() };
            // get the data and return it
            return slc[idx];
        },
        // the signature
        "index"_a,
        // the docstring
        "access the data at the given index");

    // data read access given an offset
    cls.def(
        "__getitem__",
        // delegate directly to the {slc_const_dataset_t}
        [](const slc_const_dataset_t & slc, size_t offset) {
            // easy enough
            return slc[offset];
        },
        // the signature
        "offset"_a,
        // the docstring
        "access the data at the given offset")
        // done
        ;

    // all done
    return;
}


// helper definitions
auto
flocor::py::slc_const_dataset_constructor(py::tuple pyShape, py::object pyURI)
    -> unique_pointer<slc_const_dataset_t>
{
    // extract the shape
    int lines = py::int_(pyShape[0]);
    int samples = py::int_(pyShape[1]);

    // make a shape
    slc_const_dataset_t::shape_type shape { lines, samples };
    // turn it into a layout
    slc_const_dataset_t::layout_type layout { shape };
    // make a product specification
    slc_const_dataset_t::spec_type spec { layout };

    // convert the path-like object into a string
    // get {os.fspath}
    auto fspath = py::module::import("os").attr("fspath");
    // call it and convert its return value into a string
    string_t filename = py::str(fspath(pyURI));

    // build the product and return it
    return std::unique_ptr<slc_const_dataset_t>(new slc_const_dataset_t(spec, filename));
}


// end of file
