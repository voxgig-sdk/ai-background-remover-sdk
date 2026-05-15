<?php
declare(strict_types=1);

// AiBackgroundRemover SDK utility: prepare_path

class AiBackgroundRemoverPreparePath
{
    public static function call(AiBackgroundRemoverContext $ctx): string
    {
        $point = $ctx->point;
        $parts = [];
        if ($point) {
            $p = \Voxgig\Struct\Struct::getprop($point, 'parts');
            if (is_array($p)) {
                $parts = $p;
            }
        }
        return \Voxgig\Struct\Struct::join($parts, '/', true);
    }
}
