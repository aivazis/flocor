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
#include <flocor/factories.h>


// type aliases
namespace flocor::py {
    // a 2d grid of pixel coordinates, stored on the heap
    using covering_t = flocor::products::covering_t;
}


// add the bindings
void
flocor::py::constant_shift(py::module & m)
{
    // add the function
    m.def(
        "constant_shift",
        // the implementation
        [](const covering_t & domain, covering_t::value_type shift) -> covering_t {
            // invoke the factory
            return factories::constant_shift(domain, shift);
        },
        // the signature
        "domain"_a, "shift"_a,
        // the docstring
        "apply a constant {shift} to every point in {domain}");

    // all done
    return;
}


// end of file
