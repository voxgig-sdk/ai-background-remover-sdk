<?php
declare(strict_types=1);

// AiBackgroundRemover SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class AiBackgroundRemoverMakeContext
{
    public static function call(array $ctxmap, ?AiBackgroundRemoverContext $basectx): AiBackgroundRemoverContext
    {
        return new AiBackgroundRemoverContext($ctxmap, $basectx);
    }
}
