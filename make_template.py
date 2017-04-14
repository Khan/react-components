#!/usr/bin/env python
# TODO(colin): fix these lint errors (http://pep8.readthedocs.io/en/release-1.7.x/intro.html#error-codes)
# pep8-disable:E128

import os.path

import jinja2
from jinja2.ext import Extension


class CodeExampleExtension(Extension):
    """Insert a code example.

    My plan for the docs is side-by-side code and live widgets. I plan to make
    this extension fancier in the future, since I would like one file to serve
    as the source of both the pretty code we display to the user and the
    widget. I have a vague idea of how that will work - I think there will have
    to be a header/footer that will be inserted for any given example, then
    this command will strip that out, put it where it needs to go, and format
    the code nicely.

    http://jinja.pocoo.org/docs/extensions/#adding-extensions
    """

    tags = set(["code_example"])

    def __init__(self, environment):
        super(CodeExampleExtension, self).__init__(environment)

    # {% code_example "filename" %}
    #    ^------------------ first token, call next() to advance past it
    #                 ^----- generate self._insert("filename")
    def parse(self, parser):
        lineno = parser.stream.next().lineno
        filename = parser.parse_expression()
        return (jinja2.nodes
            .CallBlock(self.call_method('_insert', [filename]), [], [], [])
            .set_lineno(lineno))

    def _insert(self, filename, caller):
        path = os.path.join('examples', filename)

        with open(path, 'r') as f:
            example = f.read()

        return (jinja2.Markup("<div class='example_div'>%s</div>") %
                example.strip())


if __name__ == '__main__':
    loader = jinja2.FileSystemLoader('.')
    env = jinja2.Environment(loader=loader, extensions=[CodeExampleExtension])
    template = env.get_template('template.html')

    with open('docs/index.html', 'w') as f:
        f.seek(0)
        f.write(template.render())
