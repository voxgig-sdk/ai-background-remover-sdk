<?php
declare(strict_types=1);

// AiBackgroundRemover SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

AiBackgroundRemoverUtility::setRegistrar(function (AiBackgroundRemoverUtility $u): void {
    $u->clean = [AiBackgroundRemoverClean::class, 'call'];
    $u->done = [AiBackgroundRemoverDone::class, 'call'];
    $u->make_error = [AiBackgroundRemoverMakeError::class, 'call'];
    $u->feature_add = [AiBackgroundRemoverFeatureAdd::class, 'call'];
    $u->feature_hook = [AiBackgroundRemoverFeatureHook::class, 'call'];
    $u->feature_init = [AiBackgroundRemoverFeatureInit::class, 'call'];
    $u->fetcher = [AiBackgroundRemoverFetcher::class, 'call'];
    $u->make_fetch_def = [AiBackgroundRemoverMakeFetchDef::class, 'call'];
    $u->make_context = [AiBackgroundRemoverMakeContext::class, 'call'];
    $u->make_options = [AiBackgroundRemoverMakeOptions::class, 'call'];
    $u->make_request = [AiBackgroundRemoverMakeRequest::class, 'call'];
    $u->make_response = [AiBackgroundRemoverMakeResponse::class, 'call'];
    $u->make_result = [AiBackgroundRemoverMakeResult::class, 'call'];
    $u->make_point = [AiBackgroundRemoverMakePoint::class, 'call'];
    $u->make_spec = [AiBackgroundRemoverMakeSpec::class, 'call'];
    $u->make_url = [AiBackgroundRemoverMakeUrl::class, 'call'];
    $u->param = [AiBackgroundRemoverParam::class, 'call'];
    $u->prepare_auth = [AiBackgroundRemoverPrepareAuth::class, 'call'];
    $u->prepare_body = [AiBackgroundRemoverPrepareBody::class, 'call'];
    $u->prepare_headers = [AiBackgroundRemoverPrepareHeaders::class, 'call'];
    $u->prepare_method = [AiBackgroundRemoverPrepareMethod::class, 'call'];
    $u->prepare_params = [AiBackgroundRemoverPrepareParams::class, 'call'];
    $u->prepare_path = [AiBackgroundRemoverPreparePath::class, 'call'];
    $u->prepare_query = [AiBackgroundRemoverPrepareQuery::class, 'call'];
    $u->result_basic = [AiBackgroundRemoverResultBasic::class, 'call'];
    $u->result_body = [AiBackgroundRemoverResultBody::class, 'call'];
    $u->result_headers = [AiBackgroundRemoverResultHeaders::class, 'call'];
    $u->transform_request = [AiBackgroundRemoverTransformRequest::class, 'call'];
    $u->transform_response = [AiBackgroundRemoverTransformResponse::class, 'call'];
});
