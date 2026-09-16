"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('BackgroundRemovalEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when AI_BACKGROUND_REMOVER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('AI_BACKGROUND_REMOVER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AiBackgroundRemoverSDK.test();
        const ent = testsdk.BackgroundRemoval();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.AI_BACKGROUND_REMOVER_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'background_removal.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "format", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "format": "uri", "name": "imageUrl", "req": false, "short": "URL to download the processed image", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "message", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "success", "req": false, "type": "`$BOOLEAN`", "index$": 3 }], "name": "background_removal", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /api/remove-background", "json": "{\"operationId\":\"removeBackground\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"multipart/form-data\":{\"schema\":{\"properties\":{\"image\":{\"description\":\"The image file to process. Supported formats: JPG, PNG, WEBP\",\"format\":\"binary\",\"type\":\"string\"}},\"required\":[\"image\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"format\":{\"example\":\"PNG\",\"type\":\"string\"},\"imageUrl\":{\"description\":\"URL to download the processed image\",\"example\":\"https://www.aibackgroundremover.site/outputs/abc123.png\",\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"example\":\"Background removed successfully\",\"type\":\"string\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}},\"image/png\":{\"schema\":{\"description\":\"High-quality transparent PNG image with background removed\",\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successfully removed background from image\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Invalid image format. Supported formats: JPG, PNG, WEBP\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid image format or corrupted file\"},\"413\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Image file size exceeds maximum allowed size\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Payload too large - Image file size exceeds limit\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Failed to process image. Please try again.\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Internal server error - Processing failed\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/api/remove-background", "segments": [{ "lit": "api" }, { "lit": "remove-background" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "background_removal", "name__orig": "background_removal", "Name": "BackgroundRemoval", "name_": "background_removal", "name-": "background-removal", "NAME": "BACKGROUND_REMOVAL", "index$": 0 }, { "active": true, "entity": "background_removal", "key$": "BasicBackgroundRemovalFlow", "kind": "basic", "name": "BasicBackgroundRemovalFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "background_removal_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'BackgroundRemoval');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const background_removal_ref01_ent = client.BackgroundRemoval();
        let background_removal_ref01_data = setup.data.new.background_removal['background_removal_ref01'];
        background_removal_ref01_data = (await background_removal_ref01_ent.create(background_removal_ref01_data)).data();
        (0, node_assert_1.default)(null != background_removal_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/background_removal/BackgroundRemovalTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AiBackgroundRemoverSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['background_removal01', 'background_removal02', 'background_removal03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'AI_BACKGROUND_REMOVER_TEST_BACKGROUND_REMOVAL_ENTID': idmap,
        'AI_BACKGROUND_REMOVER_TEST_LIVE': 'FALSE',
        'AI_BACKGROUND_REMOVER_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['AI_BACKGROUND_REMOVER_TEST_BACKGROUND_REMOVAL_ENTID'];
    const live = 'TRUE' === env.AI_BACKGROUND_REMOVER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['AI_BACKGROUND_REMOVER_TEST_BACKGROUND_REMOVAL_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.AiBackgroundRemoverSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.AI_BACKGROUND_REMOVER_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=BackgroundRemovalEntity.test.js.map