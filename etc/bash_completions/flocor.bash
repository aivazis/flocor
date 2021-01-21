# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved

# bash completion script for flocor
function _flocor() {
    # get the partial command line
    local line=${COMP_LINE}
    local word=${COMP_WORDS[COMP_CWORD]}
    # ask flocor to provide guesses
    COMPREPLY=($(flocor complete --word="${word}" --line="${line}"))
}

# register the hook
complete -F _flocor flocor

# end of file
