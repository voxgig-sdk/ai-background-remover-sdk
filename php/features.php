<?php
declare(strict_types=1);

// AiBackgroundRemover SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class AiBackgroundRemoverFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new AiBackgroundRemoverBaseFeature();
            case "test":
                return new AiBackgroundRemoverTestFeature();
            default:
                return new AiBackgroundRemoverBaseFeature();
        }
    }
}
