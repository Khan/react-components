import re

from pygments import highlight
from pygments.lexer import RegexLexer, ExtendedRegexLexer, bygroups, using, \
    include, this
from pygments.token import *
from pygments.lexers.web import JavascriptLexer, HtmlLexer
from pygments.formatters import TerminalFormatter, RawTokenFormatter


__all__ = ['JsxLexer']


class JsxLexer(RegexLexer):
    """A combination of javascript and html."""

    name = 'jsx'
    aliases = ['jsx']
    filenames = ['*.jsx']

    flags = re.DOTALL
    tokens = {
        # jsx specific stuff
        'htmlroot': [
            ('[^<&]+', Text),
            (r'&\S*?;', Name.Entity),
            (r'<\s*[\w:.-]+', Name.Tag, 'tag'),
            (r'<\s*/\s*[\w:.-]+\s*>', Name.Tag),
        ],
        'tag': [
            (r'\s+', Text),
            (r'[\w.:-]+\s*=', Name.Attribute, 'attr'),
            (r'/?\s*>', Name.Tag, '#pop'),
        ],
        'attr': [
            ('\s+', Text),
            ('".*?"', String, '#pop'),
            ("'.*?'", String, '#pop'),
            (r'[^\s>]+', String, '#pop'),
        ],

        'commentsandwhitespace': [
            (r'\s+', Text),
            (r'<!--', Comment), # TODO(joel) - why?
            (r'//.*?\n', Comment.Single),
            (r'/\*.*?\*/', Comment.Multiline)
        ],
        'slashstartsregex': [
            include('commentsandwhitespace'),
            (r'/(\\.|[^[/\\\n]|\[(\\.|[^\]\\\n])*])+/'
             r'([gim]+\b|\B)', String.Regex, '#pop'),
            (r'(?=/)', Text, ('#pop', 'badregex')),
            (r'', Text, '#pop')
        ],
        'badregex': [
            (r'\n', Text, '#pop')
        ],

        'root': [
            # TODO(joel) - another <!--
            (r'^(?=\s|/|<!--)', Text, 'slashstartsregex'),
            include('commentsandwhitespace'),

            # including es6 => and ...
            (r'\+\+|--|~|&&|\?|:|\|\||\\(?=\n)|=>|...|'
             r'(=>|<<|>>>?|==?|!=?|[-<>+*%&\|\^/])=?', Operator, 'slashstartsregex'),
            (r'[{(\[;,]', Punctuation, 'slashstartsregex'),
            (r'[})\].]', Punctuation),
            (r'(for|in|while|do|break|return|continue|switch|case|default|if|else|'
             r'throw|try|catch|finally|new|delete|typeof|instanceof|void|yield|'
             r'this)\b', Keyword, 'slashstartsregex'),
            (r'(var|let|with|function)\b', Keyword.Declaration, 'slashstartsregex'),
            (r'(abstract|boolean|byte|char|class|const|debugger|double|enum|export|'
             r'extends|final|float|goto|implements|import|int|interface|long|native|'
             r'package|private|protected|public|short|static|super|synchronized|throws|'
             r'transient|volatile)\b', Keyword.Reserved),
            (r'(true|false|null|NaN|Infinity|undefined)\b', Keyword.Constant),
            (r'(Array|Boolean|Date|Error|Function|Math|netscape|'
             r'Number|Object|Packages|RegExp|String|sun|decodeURI|'
             r'decodeURIComponent|encodeURI|encodeURIComponent|'
             r'Error|eval|isFinite|isNaN|parseFloat|parseInt|document|this|'
             r'window)\b', Name.Builtin),
            (r'[$a-zA-Z_][a-zA-Z0-9_]*', Name.Other),
            (r'[0-9][0-9]*\.[0-9]+([eE][0-9]+)?[fd]?', Number.Float),
            (r'0x[0-9a-fA-F]+', Number.Hex),
            (r'[0-9]+', Number.Integer),
            (r'"(\\\\|\\"|[^"])*"', String.Double),
            (r"'(\\\\|\\'|[^'])*'", String.Single),
        ],
    }


samples = [
"() => 'const string'",
"() => { return 'in a block'; }",
"return <code>yay!</code>",
"<span>{1 + 2}</span>",
]


if __name__ == "__main__":
    for sample in samples:
        print highlight(sample, JsxLexer(), TerminalFormatter())
        print "\n"
