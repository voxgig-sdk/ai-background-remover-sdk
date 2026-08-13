// Typed models for the AiBackgroundRemover SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface BackgroundRemoval {
  format?: string
  imageUrl?: string
  message?: string
  success?: boolean
}

export interface BackgroundRemovalCreateData {
  format?: string
  imageUrl?: string
  message?: string
  success?: boolean
}

