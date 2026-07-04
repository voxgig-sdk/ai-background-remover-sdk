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
              "active" => true,
              "name" => "format",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "image_url",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "message",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "success",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "index$" => 3,
            },
          ],
          "name" => "background_removal",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "method" => "POST",
                  "orig" => "/api/remove-background",
                  "parts" => [
                    "api",
                    "remove-background",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
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
