<?php
declare(strict_types=1);

// AiBackgroundRemover SDK configuration

class AiBackgroundRemoverConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "AiBackgroundRemover",
                "slug" => "ai-background-remover",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://www.aibackgroundremover.site",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "background_removal" => [],
                ],
            ],
            "entity" => [
        'background_removal' => [
          'fields' => [
            [
              'name' => 'format',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'imageUrl',
              'short' => 'URL to download the processed image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'message',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'success',
              'type' => '`$BOOLEAN`',
            ],
          ],
          'name' => 'background_removal',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/remove-background',
                  'parts' => [
                    'api',
                    'remove-background',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return AiBackgroundRemoverFeatures::make_feature($name);
    }
}
