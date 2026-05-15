<?php
declare(strict_types=1);

// AiBackgroundRemover SDK utility: result_body

class AiBackgroundRemoverResultBody
{
    public static function call(AiBackgroundRemoverContext $ctx): ?AiBackgroundRemoverResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
