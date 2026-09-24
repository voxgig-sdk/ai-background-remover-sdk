
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AiBackgroundRemoverSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = AiBackgroundRemoverSDK.test()
    equal(testsdk instanceof AiBackgroundRemoverSDK, true,
      'AiBackgroundRemoverSDK.test() must return a client synchronously')
  })

})
