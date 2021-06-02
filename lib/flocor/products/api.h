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
    using slc_metadata_t = SLCMetadata;
    // the rasters
    using slc_dataset_t = Raster<slc_metadata_t, false>;         // read/write
    using slc_const_dataset_t = Raster<slc_metadata_t, true>;    // read-only

    // a covering is a read/write grid of pixel coordinates, stored on the heap
    using covering_t = pyre::grid::grid_t<layout_t<2>, heap_t<std::pair<int, int>>>;
}


#endif

// end of file
