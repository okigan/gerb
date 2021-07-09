{
    "targets": [
        {
            "target_name": "addon",
            "sources": ["nodegomodule.cc"],
            "include_dirs": [
                "<!(pwd)/../gomodule/build"
            ],
            "libraries": ["<!(pwd)/../gomodule/build/gomodule.so"]
        }
    ]
}
