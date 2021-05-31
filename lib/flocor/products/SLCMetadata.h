// -*- c++ -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved

// code guard
#if !defined(flocor_products_SLCMetadata_h)
#define flocor_products_SLCMetadata_h


// specification of the metadata of an SLC product
class flocor::products::SLCMetadata {
    // types
public:
    // me
    using slc_type = SLCMetadata;
    // my pixels are complex
    using value_type = float;
    using pixel_type = complex_t<value_type>;
    // my layout
    using layout_type = layout_t<2>;
    using layout_const_reference = const layout_type &;

    // metamethods
public:
    constexpr SLCMetadata(layout_const_reference);

    // interface
public:
    // my layout
    constexpr auto layout() const -> layout_const_reference;
    // my footprint
    constexpr auto cells() const -> std::size_t;
    constexpr auto bytes() const -> std::size_t;

    // implementation details: data
private:
    const layout_type _layout;
};


// get the inline definitions
#define flocor_products_SLCMetadata_icc
#include "SLCMetadata.icc"
#undef flocor_products_SLCMetadata_icc


#endif

// end of file
