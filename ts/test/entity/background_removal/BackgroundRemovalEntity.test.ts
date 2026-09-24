

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { AiBackgroundRemoverSDK, BaseFeature, stdutil } from '../../..'

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


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AI_BACKGROUND_REMOVER_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'background_removal.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"format":{"a":true,"h":"Format","n":"format","r":false,"t":"`$STRING`","key$":"format","index$":0},"imageUrl":{"a":true,"fo":"uri","h":"Image Url","n":"imageUrl","r":false,"sh":"URL to download the processed image","t":"`$STRING`","key$":"imageUrl","index$":1},"message":{"a":true,"h":"Message","n":"message","r":false,"t":"`$STRING`","key$":"message","index$":2},"success":{"a":true,"h":"Success","n":"success","r":false,"t":"`$BOOLEAN`","key$":"success","index$":3}},"name":"background_removal","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/remove-background","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/remove-background","q":{},"r":{},"s":[{"lit":"api"},{"lit":"remove-background"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"background_removal","name__orig":"background_removal","Name":"BackgroundRemoval","name_":"background_removal","name-":"background-removal","NAME":"BACKGROUND_REMOVAL","index$":0}, {"active":true,"entity":"background_removal","key$":"BasicBackgroundRemovalFlow","kind":"basic","name":"BasicBackgroundRemovalFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"background_removal_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'BackgroundRemoval', {"POST /api/remove-background":{"protocol":"http","operationId":"removeBackground","requestBody":{"required":true,"content":{"multipart/form-data":{"schema":{"type":"object","required":["image"],"properties":{"image":{"type":"string","format":"binary","description":"The image file to process. Supported formats: JPG, PNG, WEBP"}}}}}},"responses":{"200":{"description":"Successfully removed background from image","content":{"image/png":{"schema":{"type":"string","format":"binary","description":"High-quality transparent PNG image with background removed"}},"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":true,"key$":"success"},"message":{"type":"string","example":"Background removed successfully","key$":"message"},"imageUrl":{"type":"string","format":"uri","description":"URL to download the processed image","example":"https://www.aibackgroundremover.site/outputs/abc123.png","key$":"imageUrl"},"format":{"type":"string","example":"PNG","key$":"format"}},"index$":0}}}},"400":{"description":"Bad request - Invalid image format or corrupted file","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","example":"Invalid image format. Supported formats: JPG, PNG, WEBP"}}}}}},"413":{"description":"Payload too large - Image file size exceeds limit","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","example":"Image file size exceeds maximum allowed size"}}}}}},"500":{"description":"Internal server error - Processing failed","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","example":"Failed to process image. Please try again."}}}}}}},"parameters":[],"securitySource":"unspecified"}})
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
  
