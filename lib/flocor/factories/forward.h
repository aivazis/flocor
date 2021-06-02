// -*- c++ -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved

// code guard
#if !defined(flocor_factories_forward_h)
#define flocor_factories_forward_h


// namespace setup
namespace flocor::factories {

    auto uniform_grid(const raster_t::shape_type & shape, const raster_t::shape_type & bounds)
        -> covering_t;
}


#endif

// end of file
