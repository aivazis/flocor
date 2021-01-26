// -*- c++ -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved

// code guard
#if !defined(flocor_products_extern_h)
#define flocor_products_extern_h


// STL
#include <complex>

// support
#include <pyre/grid.h>


// local aliases for external entities
namespace flocor::products {
    // complex numbers
    template <typename T>
    using complex_t = std::complex<T>;

    // storage strategies
    // memory mapped data
    template <typename pixelT, bool isReadOnly = true>
    using mmap_t = std::conditional_t<isReadOnly,
                                      pyre::memory::constmap_t<pixelT>,
                                      pyre::memory::map_t<pixelT>
                                      >;

    // products in this package are packed in the canonical layout with the default ordering
    template <int N>
    using layout_t = pyre::grid::canonical_t<N>;

    // pull {pyre::grid::grid_t} into this namespace, with a twist
    template <class specT, template<typename, bool> class storageT, bool isReadOnly = true>
    using grid_t = pyre::grid::grid_t<typename specT::layout_type,
                                      storageT<typename specT::pixel_type, isReadOnly>>;
}


#endif

// end of file
