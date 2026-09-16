# AiBackgroundRemover SDK feature factory

from aibackgroundremover_sdk.feature.base_feature import AiBackgroundRemoverBaseFeature
from aibackgroundremover_sdk.feature.ratelimit_feature import AiBackgroundRemoverRatelimitFeature
from aibackgroundremover_sdk.feature.retry_feature import AiBackgroundRemoverRetryFeature
from aibackgroundremover_sdk.feature.test_feature import AiBackgroundRemoverTestFeature
from aibackgroundremover_sdk.feature.timeout_feature import AiBackgroundRemoverTimeoutFeature


_FEATURES = {
    "base": lambda: AiBackgroundRemoverBaseFeature(),
    "ratelimit": lambda: AiBackgroundRemoverRatelimitFeature(),
    "retry": lambda: AiBackgroundRemoverRetryFeature(),
    "test": lambda: AiBackgroundRemoverTestFeature(),
    "timeout": lambda: AiBackgroundRemoverTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
