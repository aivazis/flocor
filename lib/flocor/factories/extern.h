// -*- c++ -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved

// code guard
#if !defined(flocor_factories_extern_h)
#define flocor_factories_extern_h


// we need the product definitions
#include "../products.h"


// local aliases for external entities
namespace flocor::factories {
    // the canonical layout
    template <int N>
    using layout_t = pyre::grid::canonical_t<N>;

    // the rasters have a 2d canonical layout
    using layout2d_t = layout_t<2>;

    // {covering} from {products}
    using covering_t = products::covering_t;
}


#endif

// end of file
