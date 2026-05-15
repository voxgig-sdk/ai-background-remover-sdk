# AiBackgroundRemover SDK utility: feature_add
module AiBackgroundRemoverUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
