# AiBackgroundRemover SDK utility: make_fetch_def

from __future__ import annotations
from aibackgroundremover_sdk.utility.media import request_body


def make_fetch_def_util(ctx):
    spec = ctx.spec
    if spec is None:
        return None, ctx.make_error("fetchdef_no_spec",
            "Expected context spec property to be defined.")

    from aibackgroundremover_sdk.core.result import AiBackgroundRemoverResult
    if ctx.result is None:
        ctx.result = AiBackgroundRemoverResult({})

    spec.step = "prepare"

    url, err = ctx.utility.make_url(ctx)
    if err is not None:
        return None, err

    spec.url = url

    fetchdef = {
        "url": url,
        "method": spec.method,
        "headers": spec.headers,
    }

    if spec.body is not None:
        fetchdef["body"] = request_body(ctx.point, spec.body)

    return fetchdef, None
