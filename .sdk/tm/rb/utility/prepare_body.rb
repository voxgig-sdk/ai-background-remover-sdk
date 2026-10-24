# AiBackgroundRemover SDK utility: prepare_body
require_relative 'media'
module AiBackgroundRemoverUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return AiBackgroundRemoverUtilities.raw_body(ctx.reqdata) if AiBackgroundRemoverUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
