# BackgroundRemoval entity test

require "minitest/autorun"
require "json"
require_relative "../AiBackgroundRemover_sdk"
require_relative "runner"

class BackgroundRemovalEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = AiBackgroundRemoverSDK.test(nil, nil)
    ent = testsdk.BackgroundRemoval(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = AiBackgroundRemoverConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = AiBackgroundRemoverSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.BackgroundRemoval(nil).create({ "format" => 1, "image" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = background_removal_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "background_removal." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # CREATE
    background_removal_ref01_ent = client.BackgroundRemoval(nil)
    background_removal_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.background_removal"), "background_removal_ref01"))

    background_removal_ref01_data_result = background_removal_ref01_ent.create(background_removal_ref01_data, nil)
    background_removal_ref01_data = Helpers.to_map(background_removal_ref01_data_result.respond_to?(:data_get) ? background_removal_ref01_data_result.data_get : background_removal_ref01_data_result)
    assert !background_removal_ref01_data.nil?

  end
end

def background_removal_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "background_removal", "BackgroundRemovalTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = AiBackgroundRemoverSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["background_removal01", "background_removal02", "background_removal03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["AI_BACKGROUND_REMOVER_TEST_BACKGROUND_REMOVAL_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "AI_BACKGROUND_REMOVER_TEST_BACKGROUND_REMOVAL_ENTID" => idmap,
    "AI_BACKGROUND_REMOVER_TEST_LIVE" => "FALSE",
    "AI_BACKGROUND_REMOVER_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["AI_BACKGROUND_REMOVER_TEST_BACKGROUND_REMOVAL_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["AI_BACKGROUND_REMOVER_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = AiBackgroundRemoverSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["AI_BACKGROUND_REMOVER_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["AI_BACKGROUND_REMOVER_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
