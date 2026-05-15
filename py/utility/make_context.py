# AiBackgroundRemover SDK utility: make_context

from core.context import AiBackgroundRemoverContext


def make_context_util(ctxmap, basectx):
    return AiBackgroundRemoverContext(ctxmap, basectx)
