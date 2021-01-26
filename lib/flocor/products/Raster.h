// -*- c++ -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved

// code guard
#if !defined(flocor_products_Raster_h)
#define flocor_products_Raster_h


// this class takes a product layout and builds a memory mapped grid
template <class specT, bool isReadOnly>
class flocor::products::Raster : public grid_t<specT, mmap_t, isReadOnly> {
    // type aliases
public:
    // my parameters
    using spec_type = specT;
    using spec_const_reference = const specT &;
    // me
    using raster_type = Raster<spec_type, isReadOnly>;
    using raster_const_reference = const raster_type &;
    // my base class
    using grid_type = grid_t<spec_type, mmap_t, isReadOnly>;
    // my pixel
    using pixel_type = typename spec_type::pixel_type;
    using pixel_const_reference = const pixel_type &;
    // my parts
    using storage_pointer = typename grid_type::storage_pointer;
    // my shape
    using shape_type = typename grid_type::shape_type;
    using shape_const_reference = typename grid_type::shape_const_reference;
    // my index
    using index_type = typename grid_type::index_type;
    using index_const_reference = typename grid_type::index_const_reference;
    // my layout
    using layout_type = typename grid_type::packing_type;
    using layout_const_reference = const layout_type &;

    // metamethods
public:
    // constructor from a {spec} that passes its extra arguments to the storage strategy
    template <typename... Args>
    constexpr Raster(spec_const_reference, Args&&...);

    // interface
public:
    // {size} is too overloaded, so we use {cells} to denote the number of cells in the
    // product layout, and {bytes} for its memory requirements
    constexpr auto cells() const -> std::size_t;
    constexpr auto bytes() const -> std::size_t;

    // tile factory
public:
    constexpr auto tile(index_const_reference, shape_const_reference) const -> raster_type;

    // static interface
public:
    // my read/write flag
    static constexpr auto readOnly() -> bool;

    // default metamethods
public:
    // destructor
    ~Raster() = default;
    // constructors
    Raster(const Raster &) = default;
    Raster(Raster &&) = default;
    Raster & operator=(const Raster &) = default;
    Raster & operator=(Raster &&) = default;
};


// get the inline definitions
#define flocor_products_Raster_icc
#include "Raster.icc"
#undef flocor_products_Raster_icc


#endif

// end of file
