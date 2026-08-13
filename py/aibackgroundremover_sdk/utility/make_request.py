# AiBackgroundRemover SDK utility: make_request

from __future__ import annotations
from aibackgroundremover_sdk.core.response import AiBackgroundRemoverResponse
from aibackgroundremover_sdk.core.result import AiBackgroundRemoverResult


def make_request_util(ctx):
    pre = ctx.out.get("request")
    if pre is not None:
        # A feature hook may short-circuit with an error (see make_point).
        if isinstance(pre, Exception):
            return None, pre
        return pre, None

    spec = ctx.spec
    utility = ctx.utility

    response = AiBackgroundRemoverResponse({})
    result = AiBackgroundRemoverResult({})
    ctx.result = result

    if spec is None:
        return None, ctx.make_error("request_no_spec",
            "Expected context spec property to be defined.")

    fetchdef, err = utility.make_fetch_def(ctx)
    if err is not None:
        response.err = err
        ctx.response = response
        spec.step = "postrequest"
        return response, None

    if ctx.ctrl.explain is not None:
        ctx.ctrl.explain["fetchdef"] = fetchdef

    spec.step = "prerequest"

    url = fetchdef.get("url", "")
    fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

    if fetch_err is not None:
        response.err = fetch_err
    elif fetched is None:
        response = AiBackgroundRemoverResponse({
            "err": ctx.make_error("request_no_response", "response: undefined"),
        })
    elif isinstance(fetched, dict):
        response = AiBackgroundRemoverResponse(fetched)
    else:
        response.err = ctx.make_error("request_invalid_response", "response: invalid type")

    spec.step = "postrequest"
    ctx.response = response

    return response, None
