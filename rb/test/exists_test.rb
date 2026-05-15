# AiBackgroundRemover SDK exists test

require "minitest/autorun"
require_relative "../AiBackgroundRemover_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = AiBackgroundRemoverSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
