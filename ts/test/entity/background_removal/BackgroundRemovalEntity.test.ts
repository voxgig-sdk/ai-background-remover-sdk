

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { AiBackgroundRemoverSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('BackgroundRemovalEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AI_BACKGROUND_REMOVER_TEST_LIVE=TRUE.
  afterEach(liveDelay('AI_BACKGROUND_REMOVER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AiBackgroundRemoverSDK.test()
    const ent = testsdk.BackgroundRemoval()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = AiBackgroundRemoverSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BackgroundRemoval().create({"format":1,"image":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AI_BACKGROUND_REMOVER_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'background_removal.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"format":{"a":true,"h":"Format","n":"format","r":false,"t":"`$STRING`","key$":"format","index$":0},"image":{"a":true,"fo":"binary","h":"Image","n":"image","r":true,"sh":"The image file to process.","t":"`$STRING`","key$":"image","index$":1},"imageUrl":{"a":true,"fo":"uri","h":"Image Url","n":"imageUrl","r":false,"sh":"URL to download the processed image","t":"`$STRING`","key$":"imageUrl","index$":2},"message":{"a":true,"h":"Message","n":"message","r":false,"t":"`$STRING`","key$":"message","index$":3},"success":{"a":true,"h":"Success","n":"success","r":false,"t":"`$BOOLEAN`","key$":"success","index$":4}},"name":"background_removal","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/remove-background","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/remove-background","q":{},"r":{},"rb":{"fields":[{"binary":true,"name":"image"}],"kind":"multipart","media":"multipart/form-data"},"rs":{"alternatives":[{"binary":true,"kind":"raw","media":"image/png"}],"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"remove-background"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"background_removal","name__orig":"background_removal","Name":"BackgroundRemoval","name_":"background_removal","name-":"background-removal","NAME":"BACKGROUND_REMOVAL","index$":0}, {"active":true,"entity":"background_removal","key$":"BasicBackgroundRemovalFlow","kind":"basic","name":"BasicBackgroundRemovalFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"background_removal_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'BackgroundRemoval', {"POST /api/remove-background":{"protocol":"http","requestBody":{"required":true,"content":{"multipart/form-data":{"schema":{"type":"object","required":["image"],"properties":{"image":{"type":"string","format":"binary","description":"The image file to process. Supported formats: JPG, PNG, WEBP","key$":"image"}},"index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const background_removal_ref01_ent = client.BackgroundRemoval()
    let background_removal_ref01_data = setup.data.new.background_removal['background_removal_ref01']

    background_removal_ref01_data = (await background_removal_ref01_ent.create(background_removal_ref01_data)).data()
    assert(null != background_removal_ref01_data)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/background_removal/BackgroundRemovalTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = AiBackgroundRemoverSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['background_removal01','background_removal02','background_removal03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AI_BACKGROUND_REMOVER_TEST_BACKGROUND_REMOVAL_ENTID': idmap,
    'AI_BACKGROUND_REMOVER_TEST_LIVE': 'FALSE',
    'AI_BACKGROUND_REMOVER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AI_BACKGROUND_REMOVER_TEST_BACKGROUND_REMOVAL_ENTID']

  const live = 'TRUE' === env.AI_BACKGROUND_REMOVER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AI_BACKGROUND_REMOVER_TEST_BACKGROUND_REMOVAL_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new AiBackgroundRemoverSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
