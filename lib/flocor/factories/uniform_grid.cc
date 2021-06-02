// -*- c++ -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// pull the environment
#include "public.h"


// the uniform grid generator
auto
flocor::factories::uniform_grid(
    const layout2d_t::shape_type & shape, const layout2d_t::shape_type & bounds) -> covering_t
{
    // make a layout for my points
    covering_t::packing_type layout(shape);
    // and use it to make the bag of points
    covering_t points(layout, layout.cells());

    // all done
    return points;
}


// end of file
