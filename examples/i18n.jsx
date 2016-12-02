var translated = <$_ first="Motoko" last="Kusanagi">
    Hello, %(first)s %(last)s!
</$_>;

var link = <a href="javascript:void 0;">
    <$_>Click here</$_>
</a>;

return <span>
    <$_ clickHere={link}>
        We noticed you had a little trouble with this task.
        %(clickHere)s to hide it until later.
    </$_>
</span>;
