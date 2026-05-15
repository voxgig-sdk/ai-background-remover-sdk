<?php
declare(strict_types=1);

// AiBackgroundRemover SDK base feature

class AiBackgroundRemoverBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(AiBackgroundRemoverContext $ctx, array $options): void {}
    public function PostConstruct(AiBackgroundRemoverContext $ctx): void {}
    public function PostConstructEntity(AiBackgroundRemoverContext $ctx): void {}
    public function SetData(AiBackgroundRemoverContext $ctx): void {}
    public function GetData(AiBackgroundRemoverContext $ctx): void {}
    public function GetMatch(AiBackgroundRemoverContext $ctx): void {}
    public function SetMatch(AiBackgroundRemoverContext $ctx): void {}
    public function PrePoint(AiBackgroundRemoverContext $ctx): void {}
    public function PreSpec(AiBackgroundRemoverContext $ctx): void {}
    public function PreRequest(AiBackgroundRemoverContext $ctx): void {}
    public function PreResponse(AiBackgroundRemoverContext $ctx): void {}
    public function PreResult(AiBackgroundRemoverContext $ctx): void {}
    public function PreDone(AiBackgroundRemoverContext $ctx): void {}
    public function PreUnexpected(AiBackgroundRemoverContext $ctx): void {}
}
