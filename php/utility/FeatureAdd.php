<?php
declare(strict_types=1);

// AiBackgroundRemover SDK utility: feature_add

class AiBackgroundRemoverFeatureAdd
{
    public static function call(AiBackgroundRemoverContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
