# AiBackgroundRemover SDK utility: transform_request
require_relative 'struct/voxgig_struct'
require_relative '../core/helpers'
module AiBackgroundRemoverUtilities
  # `$action` selects the point (see MakePoint); it is never an API field, so
  # the body is a copy without it. The caller's hash is left untouched.
  def self.strip_action(reqdata)
    return reqdata unless reqdata.is_a?(Hash) && reqdata.key?("$action")
    reqdata.reject { |k, _| k == "$action" }
  end

  TransformRequest = ->(ctx) {
    spec = ctx.spec
    point = ctx.point
    spec.step = "reqform" if spec
    transform = AiBackgroundRemoverHelpers.to_map(VoxgigStruct.getprop(point, "transform"))
    return AiBackgroundRemoverUtilities.strip_action(ctx.reqdata) unless transform
    reqform = VoxgigStruct.getprop(transform, "req")
    return AiBackgroundRemoverUtilities.strip_action(ctx.reqdata) unless reqform
    AiBackgroundRemoverUtilities.strip_action(VoxgigStruct.transform({ "reqdata" => ctx.reqdata }, reqform))
  }
end
