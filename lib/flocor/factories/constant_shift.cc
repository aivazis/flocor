// -*- c++ -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// pull the environment
#include "public.h"


// the uniform grid generator
auto
flocor::factories::constant_shift(const covering_t & domain, covering_t::value_type shift)
    -> covering_t
{
    // make a layout for my points
    auto layout = domain.layout();
    // and use it to make the bag of points
    covering_t range(layout, layout.cells());

    // all done
    return range;
}


// end of file
