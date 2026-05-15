-- AiBackgroundRemover SDK error

local AiBackgroundRemoverError = {}
AiBackgroundRemoverError.__index = AiBackgroundRemoverError


function AiBackgroundRemoverError.new(code, msg, ctx)
  local self = setmetatable({}, AiBackgroundRemoverError)
  self.is_sdk_error = true
  self.sdk = "AiBackgroundRemover"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function AiBackgroundRemoverError:error()
  return self.msg
end


function AiBackgroundRemoverError:__tostring()
  return self.msg
end


return AiBackgroundRemoverError
