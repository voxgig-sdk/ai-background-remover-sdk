
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AiBackgroundRemoverSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await AiBackgroundRemoverSDK.test()
    equal(null !== testsdk, true)
  })

})
