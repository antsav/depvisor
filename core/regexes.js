var list = [
    '<link.*href="(.+)".*>',
    '<script.*src="(.+)".*</script>',
    ".render.\n(.*)",
    "require.'(.+.js)'."
]

module.exports.list = list;