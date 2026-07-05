-- Typed models for the AiBackgroundRemover SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class BackgroundRemoval
---@field format? string
---@field image_url? string
---@field message? string
---@field success? boolean

---@class BackgroundRemovalCreateData
---@field format? string
---@field image_url? string
---@field message? string
---@field success? boolean

local M = {}

return M
