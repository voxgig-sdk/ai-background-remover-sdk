package sdktest

import (
	"testing"

	sdk "github.com/voxgig-sdk/ai-background-remover-sdk"
)

func TestExists(t *testing.T) {
	t.Run("test-mode", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		if testsdk == nil {
			t.Fatal("expected non-nil SDK")
		}
	})
}
