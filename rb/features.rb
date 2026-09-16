# AiBackgroundRemover SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module AiBackgroundRemoverFeatures
  def self.make_feature(name)
    case name
    when "base"
      AiBackgroundRemoverBaseFeature.new
    when "ratelimit"
      AiBackgroundRemoverRatelimitFeature.new
    when "retry"
      AiBackgroundRemoverRetryFeature.new
    when "test"
      AiBackgroundRemoverTestFeature.new
    when "timeout"
      AiBackgroundRemoverTimeoutFeature.new
    else
      AiBackgroundRemoverBaseFeature.new
    end
  end
end
