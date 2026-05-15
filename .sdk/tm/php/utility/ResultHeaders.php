<?php
declare(strict_types=1);

// AiBackgroundRemover SDK utility: result_headers

class AiBackgroundRemoverResultHeaders
{
    public static function call(AiBackgroundRemoverContext $ctx): ?AiBackgroundRemoverResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
