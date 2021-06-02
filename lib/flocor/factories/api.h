// -*- c++ -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved

// code guard
#if !defined(flocor_factories_api_h)
#define flocor_factories_api_h


// publicly visible types
namespace flocor::factories {
    // the
    auto uniform_grid(const layout2d_t::shape_type & shape, const layout2d_t::shape_type & bounds)
        -> covering_t;
}


#endif

// end of file
