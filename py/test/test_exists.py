# AiBackgroundRemover SDK exists test

import pytest
from aibackgroundremover_sdk import AiBackgroundRemoverSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = AiBackgroundRemoverSDK.test(None, None)
        assert testsdk is not None
