## `domains/shop`

**usage:**

- `❯ deno upgrade v2.0.0`
- `❯ cd domains/shop/`
- `❯ deno task dev`
- `❯ deno task test`
- `❯ open -a safari --url "http://localhost:8082/"`

**architecture:**

- the code is split into microservices
- each microservice has its own database and data
- microservices communicate with each other using HTTP endpoints
- an API gateway provides data to frontends
- microservices serve multiple requests per lifetime
- there is a key-value store to read and write entities, limited to 65536 bytes per entry
- a queue processes entities, to not block requests
