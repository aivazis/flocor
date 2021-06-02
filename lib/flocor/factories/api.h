// -*- c++ -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved

// code guard
#if !defined(flocor_factories_api_h)
#define flocor_factories_api_h


// publicly visible types
namespace flocor::factories {
    // generate a grid of points over the {bounds} of a dataset
    auto uniform_grid(const layout2d_t::shape_type & shape, const layout2d_t::shape_type & bounds)
        -> covering_t;

    // apply a constant {shift} to a collection of points
    auto constant_shift(const covering_t & domain, covering_t::value_type shift) -> covering_t;
}


#endif

// end of file
