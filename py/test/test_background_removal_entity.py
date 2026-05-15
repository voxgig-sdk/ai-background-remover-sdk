# BackgroundRemoval entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from aibackgroundremover_sdk import AiBackgroundRemoverSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestBackgroundRemovalEntity:

    def test_should_create_instance(self):
        testsdk = AiBackgroundRemoverSDK.test(None, None)
        ent = testsdk.BackgroundRemoval(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _background_removal_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "background_removal." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set AIBACKGROUNDREMOVER_TEST_BACKGROUND_REMOVAL_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        background_removal_ref01_ent = client.BackgroundRemoval(None)
        background_removal_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.background_removal"), "background_removal_ref01"))

        background_removal_ref01_data_result, err = background_removal_ref01_ent.create(background_removal_ref01_data, None)
        assert err is None
        background_removal_ref01_data = helpers.to_map(background_removal_ref01_data_result)
        assert background_removal_ref01_data is not None



def _background_removal_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/background_removal/BackgroundRemovalTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = AiBackgroundRemoverSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["background_removal01", "background_removal02", "background_removal03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "AIBACKGROUNDREMOVER_TEST_BACKGROUND_REMOVAL_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "AIBACKGROUNDREMOVER_TEST_BACKGROUND_REMOVAL_ENTID": idmap,
        "AIBACKGROUNDREMOVER_TEST_LIVE": "FALSE",
        "AIBACKGROUNDREMOVER_TEST_EXPLAIN": "FALSE",
        "AIBACKGROUNDREMOVER_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("AIBACKGROUNDREMOVER_TEST_BACKGROUND_REMOVAL_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("AIBACKGROUNDREMOVER_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("AIBACKGROUNDREMOVER_APIKEY"),
            },
            extra or {},
        ])
        client = AiBackgroundRemoverSDK(helpers.to_map(merged_opts))

    _live = env.get("AIBACKGROUNDREMOVER_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("AIBACKGROUNDREMOVER_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
