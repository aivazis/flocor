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
flocor::py::uniform_grid(py::module & m)
{
    // add the function
    m.def(
        "uniform_grid",
        // the implementation
        [](const shape2d_t & shape, const shape2d_t & bounds) -> void {
            // all done
            return;
        },
        // the signature
        "shape"_a, "bounds"_a,
        // the docstring
        "build a uniform grid of the given {shape} over the {bounds} of a raster");

    // all done
    return;
}


// end of file
