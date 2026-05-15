package = "voxgig-sdk-ai-background-remover"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/ai-background-remover-sdk.git"
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
