package = "voxgig-sdk-ai-background-remover"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/ai-background-remover-sdk.git",
  tag = "lua/v0.0.1",
  dir = "ai-background-remover-sdk/lua"
}
description = {
  summary = "AiBackgroundRemover SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["ai-background-remover_sdk"] = "ai-background-remover_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
