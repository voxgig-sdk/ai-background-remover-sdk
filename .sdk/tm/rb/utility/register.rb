# AiBackgroundRemover SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

AiBackgroundRemoverUtility.registrar = ->(u) {
  u.clean = AiBackgroundRemoverUtilities::Clean
  u.done = AiBackgroundRemoverUtilities::Done
  u.make_error = AiBackgroundRemoverUtilities::MakeError
  u.feature_add = AiBackgroundRemoverUtilities::FeatureAdd
  u.feature_hook = AiBackgroundRemoverUtilities::FeatureHook
  u.feature_init = AiBackgroundRemoverUtilities::FeatureInit
  u.fetcher = AiBackgroundRemoverUtilities::Fetcher
  u.make_fetch_def = AiBackgroundRemoverUtilities::MakeFetchDef
  u.make_context = AiBackgroundRemoverUtilities::MakeContext
  u.make_options = AiBackgroundRemoverUtilities::MakeOptions
  u.make_request = AiBackgroundRemoverUtilities::MakeRequest
  u.make_response = AiBackgroundRemoverUtilities::MakeResponse
  u.make_result = AiBackgroundRemoverUtilities::MakeResult
  u.make_point = AiBackgroundRemoverUtilities::MakePoint
  u.make_spec = AiBackgroundRemoverUtilities::MakeSpec
  u.make_url = AiBackgroundRemoverUtilities::MakeUrl
  u.param = AiBackgroundRemoverUtilities::Param
  u.prepare_auth = AiBackgroundRemoverUtilities::PrepareAuth
  u.prepare_body = AiBackgroundRemoverUtilities::PrepareBody
  u.prepare_headers = AiBackgroundRemoverUtilities::PrepareHeaders
  u.prepare_method = AiBackgroundRemoverUtilities::PrepareMethod
  u.prepare_params = AiBackgroundRemoverUtilities::PrepareParams
  u.prepare_path = AiBackgroundRemoverUtilities::PreparePath
  u.prepare_query = AiBackgroundRemoverUtilities::PrepareQuery
  u.graphql_body = AiBackgroundRemoverUtilities::GraphqlBody
  u.graphql_errors = AiBackgroundRemoverUtilities::GraphqlErrors
  u.result_basic = AiBackgroundRemoverUtilities::ResultBasic
  u.result_body = AiBackgroundRemoverUtilities::ResultBody
  u.result_headers = AiBackgroundRemoverUtilities::ResultHeaders
  u.transform_request = AiBackgroundRemoverUtilities::TransformRequest
  u.transform_response = AiBackgroundRemoverUtilities::TransformResponse
}
