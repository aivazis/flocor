// -*- c++ -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved

// code guard
#if !defined(flocor_py_forward_h)
#define flocor_py_forward_h


// useful type aliases
namespace flocor::py {
    // 2d layouts
    using layout2d_t = products::layout_t<2>;
    using order2d_t = layout2d_t::order_type;
    using shape2d_t = layout2d_t::shape_type;
    using index2d_t = layout2d_t::index_type;
    // 3d layouts
    using layout3d_t = products::layout_t<3>;
    using order3d_t = layout3d_t::order_type;
    using shape3d_t = layout3d_t::shape_type;
    using index3d_t = layout3d_t::index_type;
}

// the {flocor} namespace
namespace flocor::py {
    // bindings of opaque types
    void opaque(py::module &);
    // exceptions
    void exceptions(py::module &);

    // bindings for grid parts
    // 2d
    void order2d(py::module &);
    void index2d(py::module &);
    void shape2d(py::module &);
    void layout2d(py::module &);
    // 3d
    void order3d(py::module &);
    void index3d(py::module &);
    void shape3d(py::module &);
    void layout3d(py::module &);

    // bindings for the {slc_t} product spec
    void slc_metadata(py::module &);
}


#endif

// end of file
