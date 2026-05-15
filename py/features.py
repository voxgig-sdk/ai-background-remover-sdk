# AiBackgroundRemover SDK feature factory

from feature.base_feature import AiBackgroundRemoverBaseFeature
from feature.test_feature import AiBackgroundRemoverTestFeature


def _make_feature(name):
    features = {
        "base": lambda: AiBackgroundRemoverBaseFeature(),
        "test": lambda: AiBackgroundRemoverTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
