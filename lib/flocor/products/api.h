// -*- c++ -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved

// code guard
#if !defined(flocor_products_api_h)
#define flocor_products_api_h


// publicly visible types
namespace flocor::products {
    // slc
    // the spec
    using slc_t = SLC;

    // SLC rasters
    using slc_raster_t = Raster<slc_t, false>;       // read/write
    using slc_const_raster_t = Raster<slc_t, true>;  // read-only
}


#endif

// end of file
