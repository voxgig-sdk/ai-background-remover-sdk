<?php
declare(strict_types=1);

// BackgroundRemoval entity test

require_once __DIR__ . '/../aibackgroundremover_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class BackgroundRemovalEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = AiBackgroundRemoverSDK::test(null, null);
        $ent = $testsdk->BackgroundRemoval(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = background_removal_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "background_removal." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set AIBACKGROUNDREMOVER_TEST_BACKGROUND_REMOVAL_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $background_removal_ref01_ent = $client->BackgroundRemoval(null);
        $background_removal_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.background_removal"), "background_removal_ref01"));

        [$background_removal_ref01_data_result, $err] = $background_removal_ref01_ent->create($background_removal_ref01_data, null);
        $this->assertNull($err);
        $background_removal_ref01_data = Helpers::to_map($background_removal_ref01_data_result);
        $this->assertNotNull($background_removal_ref01_data);

    }
}

function background_removal_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/background_removal/BackgroundRemovalTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = AiBackgroundRemoverSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["background_removal01", "background_removal02", "background_removal03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("AIBACKGROUNDREMOVER_TEST_BACKGROUND_REMOVAL_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "AIBACKGROUNDREMOVER_TEST_BACKGROUND_REMOVAL_ENTID" => $idmap,
        "AIBACKGROUNDREMOVER_TEST_LIVE" => "FALSE",
        "AIBACKGROUNDREMOVER_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["AIBACKGROUNDREMOVER_TEST_BACKGROUND_REMOVAL_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["AIBACKGROUNDREMOVER_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new AiBackgroundRemoverSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["AIBACKGROUNDREMOVER_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["AIBACKGROUNDREMOVER_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
