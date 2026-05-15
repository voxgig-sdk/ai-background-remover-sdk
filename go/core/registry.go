package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBackgroundRemovalEntityFunc func(client *AiBackgroundRemoverSDK, entopts map[string]any) AiBackgroundRemoverEntity

