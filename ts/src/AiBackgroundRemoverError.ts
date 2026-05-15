
import { Context } from './Context'


class AiBackgroundRemoverError extends Error {

  isAiBackgroundRemoverError = true

  sdk = 'AiBackgroundRemover'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  AiBackgroundRemoverError
}

