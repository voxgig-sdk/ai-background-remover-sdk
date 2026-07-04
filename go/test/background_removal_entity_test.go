package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/ai-background-remover-sdk/go"
	"github.com/voxgig-sdk/ai-background-remover-sdk/go/core"

	vs "github.com/voxgig-sdk/ai-background-remover-sdk/go/utility/struct"
)

func TestBackgroundRemovalEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.BackgroundRemoval(nil)
		if ent == nil {
			t.Fatal("expected non-nil BackgroundRemovalEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := background_removalBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "background_removal." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set AIBACKGROUNDREMOVER_TEST_BACKGROUND_REMOVAL_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		backgroundRemovalRef01Ent := client.BackgroundRemoval(nil)
		backgroundRemovalRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "background_removal"}, setup.data), "background_removal_ref01"))

		backgroundRemovalRef01DataResult, err := backgroundRemovalRef01Ent.Create(backgroundRemovalRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		backgroundRemovalRef01Data = core.ToMapAny(backgroundRemovalRef01DataResult)
		if backgroundRemovalRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func background_removalBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "background_removal", "BackgroundRemovalTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read background_removal test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse background_removal test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"background_removal01", "background_removal02", "background_removal03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("AIBACKGROUNDREMOVER_TEST_BACKGROUND_REMOVAL_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"AIBACKGROUNDREMOVER_TEST_BACKGROUND_REMOVAL_ENTID": idmap,
		"AIBACKGROUNDREMOVER_TEST_LIVE":      "FALSE",
		"AIBACKGROUNDREMOVER_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["AIBACKGROUNDREMOVER_TEST_BACKGROUND_REMOVAL_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["AIBACKGROUNDREMOVER_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewAiBackgroundRemoverSDK(core.ToMapAny(mergedOpts))
	}

	live := env["AIBACKGROUNDREMOVER_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["AIBACKGROUNDREMOVER_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
