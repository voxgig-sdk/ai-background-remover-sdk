package voxgigaibackgroundremoversdk

import (
	"github.com/voxgig-sdk/ai-background-remover-sdk/go/core"
	"github.com/voxgig-sdk/ai-background-remover-sdk/go/entity"
	"github.com/voxgig-sdk/ai-background-remover-sdk/go/feature"
	_ "github.com/voxgig-sdk/ai-background-remover-sdk/go/utility"
)

// Type aliases preserve external API.
type AiBackgroundRemoverSDK = core.AiBackgroundRemoverSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type AiBackgroundRemoverEntity = core.AiBackgroundRemoverEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type AiBackgroundRemoverError = core.AiBackgroundRemoverError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBackgroundRemovalEntityFunc = func(client *core.AiBackgroundRemoverSDK, entopts map[string]any) core.AiBackgroundRemoverEntity {
		return entity.NewBackgroundRemovalEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewAiBackgroundRemoverSDK = core.NewAiBackgroundRemoverSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewAiBackgroundRemoverSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *AiBackgroundRemoverSDK  { return NewAiBackgroundRemoverSDK(nil) }
func Test() *AiBackgroundRemoverSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
