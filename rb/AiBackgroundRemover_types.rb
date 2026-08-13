# frozen_string_literal: true

# Typed models for the AiBackgroundRemover SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# BackgroundRemoval entity data model.
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] imageUrl
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
BackgroundRemoval = Struct.new(
  :format,
  :imageUrl,
  :message,
  :success,
  keyword_init: true
)

# Request payload for BackgroundRemoval#create.
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] imageUrl
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
BackgroundRemovalCreateData = Struct.new(
  :format,
  :imageUrl,
  :message,
  :success,
  keyword_init: true
)

