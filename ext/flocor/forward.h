// -*- c++ -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved

// code guard
#if !defined(flocor_py_forward_h)
#define flocor_py_forward_h


// the {flocor} namespace
namespace flocor::py {
    // bindings of opaque types
    void opaque(py::module &);
    // exceptions
    void exceptions(py::module &);

    // bindings for the product memory layouts
    void order2d(py::module &);
    void index2d(py::module &);
    void shape2d(py::module &);
    void layout2d(py::module &);

    // bindings for the {slc_t} product spec
    void slc(py::module &);
}


#endif

// end of file
