# AiBackgroundRemover SDK

AI Background Remover client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

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

## Quickstart

### TypeScript

```ts
import { AiBackgroundRemoverSDK } from 'ai-background-remover'

const client = new AiBackgroundRemoverSDK({
  apikey: process.env.AI-BACKGROUND-REMOVER_APIKEY,
})

```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

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
| **BackgroundRemoval** |  | `/api/remove-background` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from aibackgroundremover_sdk import AiBackgroundRemoverSDK

client = AiBackgroundRemoverSDK({
    "apikey": os.environ.get("AI-BACKGROUND-REMOVER_APIKEY"),
})

```

### PHP

```php
<?php
require_once 'aibackgroundremover_sdk.php';

$client = new AiBackgroundRemoverSDK([
    "apikey" => getenv("AI-BACKGROUND-REMOVER_APIKEY"),
]);

```

### Golang

```go
import sdk "github.com/voxgig-sdk/ai-background-remover-sdk/go"

client := sdk.NewAiBackgroundRemoverSDK(map[string]any{
    "apikey": os.Getenv("AI-BACKGROUND-REMOVER_APIKEY"),
})

```

### Ruby

```ruby
require_relative "AiBackgroundRemover_sdk"

client = AiBackgroundRemoverSDK.new({
  "apikey" => ENV["AI-BACKGROUND-REMOVER_APIKEY"],
})

```

### Lua

```lua
local sdk = require("ai-background-remover_sdk")

local client = sdk.new({
  apikey = os.getenv("AI-BACKGROUND-REMOVER_APIKEY"),
})

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
client = AiBackgroundRemoverSDK.test()
result, err = client.BackgroundRemoval().load({"id": "test01"})
```

### PHP

```php
$client = AiBackgroundRemoverSDK::test();
[$result, $err] = $client->BackgroundRemoval()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.BackgroundRemoval(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = AiBackgroundRemoverSDK.test
result, err = client.BackgroundRemoval().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:BackgroundRemoval():load({ id = "test01" })
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

---

Generated from the AI Background Remover OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
