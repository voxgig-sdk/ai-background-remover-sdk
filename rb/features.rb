# AiBackgroundRemover SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module AiBackgroundRemoverFeatures
  def self.make_feature(name)
    case name
    when "base"
      AiBackgroundRemoverBaseFeature.new
    when "test"
      AiBackgroundRemoverTestFeature.new
    else
      AiBackgroundRemoverBaseFeature.new
    end
  end
end
