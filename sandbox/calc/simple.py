#! /usr/bin/env python3
# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# framework
import flocor


# the driver
def simple():
    """
    Build a simple flow
    """
    # make a dynamic workflow
    flow = flocor.flow.dynamic(name="simple")
    # make a diagram with the flow
    diagram = flocor.diagram.diagram(flow=flow)

    # build a couple of inputs
    a = flocor.flows.var(family="int")
    b = flocor.flows.var(family="int")
    # and a place to store the answer
    r = flocor.flows.var(family="int")
    # add them all to the diagram
    p_a = diagram.addProduct(product=a, position=(0, 0))
    p_b = diagram.addProduct(product=b, position=(0, 2))
    p_r = diagram.addProduct(product=r, position=(8, 1))

    # build a factory
    plus = flocor.flows.operator(family="add")
    # add it to the diagram
    f_plus = diagram.addFactory(factory=plus, position=(4, 1))

    # bind by moving
    diagram.move(node=p_a, position=(1,0))
    diagram.move(node=p_b, position=(1,2))
    diagram.move(node=p_r, position=(7,1))

    # diagram
    print("products:")
    for rep in diagram.products:
        print(f"    {rep}: {rep.position}")
        for f,t in rep.connectors:
            print(f"        {f}, trait {t.name}")
    print("factories:")
    for rep in diagram.factories:
        print(f"    {rep}: {rep.position}")
        for t,s in rep.slots.items():
            print(f"        {s}, trait {t.name}")
    print("slots:")
    for rep in diagram.slots:
        print(f"    {rep}: {rep.position}")
    print("layout:")
    for position, node in diagram.layout.items():
        print(f"   {position}: {node}")

    # set some values
    a.value = 1
    b.value = 2
    # do the math
    print(f"{a.value} + {b.value} = {r.pyre_make().value}")
    # and again
    a.value = 2
    print(f"{a.value} + {b.value} = {r.pyre_make().value}")

    # all done
    return 0


# bootstrap
if __name__ == "__main__":
    # invoke the driver
    status = simple()
    # and share the status with the shell
    raise SystemExit(status)


# end of file
