# AiBackgroundRemover SDK utility: make_context
require_relative '../core/context'
module AiBackgroundRemoverUtilities
  MakeContext = ->(ctxmap, basectx) {
    AiBackgroundRemoverContext.new(ctxmap, basectx)
  }
end
