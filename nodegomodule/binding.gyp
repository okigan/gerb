{
    "targets": [
        {
            "target_name": "gomodule_addon",
            "sources": ["nodegomodule.cc"],
            "include_dirs": [
                "<(module_root_dir)/../../"
            ],
            "libraries": ["<(module_root_dir)/../../../gomodule/build/gomodule.so"]
        }
    ]
}
