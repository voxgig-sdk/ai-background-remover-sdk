# AiBackgroundRemover SDK configuration

module AiBackgroundRemoverConfig
  def self.make_config
    {
      "main" => {
        "name" => "AiBackgroundRemover",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://www.aibackgroundremover.site",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "background_removal" => {},
        },
      },
      "entity" => {
        "background_removal" => {
          "fields" => [
            {
              "name" => "format",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "image_url",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "message",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "success",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "active" => true,
              "index$" => 3,
            },
          ],
          "name" => "background_removal",
          "op" => {
            "create" => {
              "name" => "create",
              "points" => [
                {
                  "method" => "POST",
                  "orig" => "/api/remove-background",
                  "parts" => [
                    "api",
                    "remove-background",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "create",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    AiBackgroundRemoverFeatures.make_feature(name)
  end
end
