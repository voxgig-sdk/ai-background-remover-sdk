<?php
declare(strict_types=1);

// AiBackgroundRemover SDK utility: prepare_body

class AiBackgroundRemoverPrepareBody
{
    public static function call(AiBackgroundRemoverContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
