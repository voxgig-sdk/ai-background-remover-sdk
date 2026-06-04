# AiBackgroundRemover SDK

Remove image backgrounds with an AI service that returns a transparent-background image, no sign-up required

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About AI Background Remover

[AI Background Remover](https://www.aibackgroundremover.site) is a free web service that strips the background from an uploaded image and returns the cut-out subject on a transparent canvas. It is positioned as a no-account, browser-friendly tool aimed at quick one-off edits.

What you get from the API:

- Upload an image and receive a version with the background removed
- Transparent-background output suitable for compositing or further editing
- Public access without registration or API keys

Operational notes: CORS is enabled, so the endpoint can be called directly from browser-side code. The catalogue listing on freepublicapis.com reports sub-second typical response times and tracks uptime, but no published rate limits, quotas, or formal SLA are documented. Treat it as a best-effort public endpoint.

## Try it

**TypeScript**
```bash
npm install ai-background-remover
```

**Python**
```bash
pip install ai-background-remover-sdk
```

**PHP**
```bash
composer require voxgig/ai-background-remover-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/ai-background-remover-sdk/go
```

**Ruby**
```bash
gem install ai-background-remover-sdk
```

**Lua**
```bash
luarocks install ai-background-remover-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { AiBackgroundRemoverSDK } from 'ai-background-remover'

const client = new AiBackgroundRemoverSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o ai-background-remover-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "ai-background-remover": {
      "command": "/abs/path/to/ai-background-remover-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **BackgroundRemoval** | Represents the image background-removal operation exposed by the service — submit an image to the API and receive the same image with its background made transparent. | `/api/remove-background` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from aibackgroundremover_sdk import AiBackgroundRemoverSDK

client = AiBackgroundRemoverSDK({})

```

### PHP

```php
<?php
require_once 'aibackgroundremover_sdk.php';

$client = new AiBackgroundRemoverSDK([]);

```

### Golang

```go
import sdk "github.com/voxgig-sdk/ai-background-remover-sdk/go"

client := sdk.NewAiBackgroundRemoverSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "AiBackgroundRemover_sdk"

client = AiBackgroundRemoverSDK.new({})

```

### Lua

```lua
local sdk = require("ai-background-remover_sdk")

local client = sdk.new({})

```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = AiBackgroundRemoverSDK.test()
const result = await client.BackgroundRemoval().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = AiBackgroundRemoverSDK.test(None, None)
result, err = client.BackgroundRemoval(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = AiBackgroundRemoverSDK::test(null, null);
[$result, $err] = $client->BackgroundRemoval(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.BackgroundRemoval(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = AiBackgroundRemoverSDK.test(nil, nil)
result, err = client.BackgroundRemoval(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:BackgroundRemoval(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the AI Background Remover

- Upstream: [https://www.aibackgroundremover.site](https://www.aibackgroundremover.site)
- API docs: [https://freepublicapis.com/ai-background-remover](https://freepublicapis.com/ai-background-remover)

---

Generated from the AI Background Remover OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
