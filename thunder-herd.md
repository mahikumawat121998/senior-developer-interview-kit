Ah, you are asking about the **“Thunder Herd / Thunderbird problem”** in distributed system design — not airline systems.

This problem is usually called:

# Thundering Herd Problem

It happens when **many requests hit a system simultaneously for the same resource**.

Example with a flight booking system:

```text
Only 1 seat left on a flight
        |
10,000 users try booking at same time
```

Now all requests hit:

* DB
* Cache
* Inventory service
* Payment service

at the same time.

This sudden spike is called a **Thundering Herd**.

---

# Real Flight Booking Example

Suppose:

```text
Flight AI-302
Jaipur → Dubai
Only 1 seat remaining
```

Now:

* 50,000 users refresh page
* Everyone clicks BOOK simultaneously

Without protection:

```text
Request 1 -> seat available
Request 2 -> seat available
Request 3 -> seat available
...
```

All systems think seat is available.

Result:

* Double booking
* DB overload
* Crashes
* Payment inconsistencies

---

# How System Design Handles This

# 1. Distributed Locking

First request locks the seat.

```text
Seat A1 LOCKED
```

Other requests wait or fail.

Architecture:

```text
User Requests
      |
Booking Service
      |
Redis Distributed Lock
      |
Database
```

Common tools:

* Redis Redlock
* Zookeeper
* etcd

---

# 2. Queue-Based Processing

Instead of direct DB hits:

```text
Requests -> Kafka/RabbitMQ Queue
                    |
              Booking Workers
```

Benefits:

* Smooth traffic
* Prevent DB spikes
* Controlled concurrency

---

# 3. Cache Protection

Suppose cache expires for flight data.

Without protection:

```text
10,000 requests miss cache
10,000 DB queries happen
```

DB dies.

This is another Thundering Herd scenario.

Solution:

## Request Coalescing

Only ONE request fetches DB data.

Others wait.

```text
First request -> DB
Others -> wait
```

---

# 4. Rate Limiting

Prevent too many requests from same users/IPs.

Example:

```text
100 requests/sec allowed
```

Tools:

* API Gateway
* NGINX
* Kong
* Redis counters

---

# 5. Circuit Breaker Pattern

If downstream service fails:

```text
Booking Service -> Payment Service DOWN
```

Circuit breaker stops sending requests temporarily.

Prevents cascading failures.

Used with:

* Hystrix
* Resilience4j

---

# 6. Load Balancer

Traffic distributed across servers.

```text
Users
  |
Load Balancer
 |   |   |
S1  S2  S3
```

Prevents single server overload.

---

# 7. Database Protection

Use:

* Read replicas
* Connection pooling
* Sharding

Because millions of seat checks happen.

---

# Flight Booking Flow With Protection

```text
User clicks BOOK
       |
API Gateway
       |
Rate Limiter
       |
Booking Service
       |
Redis Lock
       |
Queue (Kafka)
       |
Booking Worker
       |
Database Transaction
       |
Payment
```

---

# Important Patterns Used

| Problem                | Pattern            |
| ---------------------- | ------------------ |
| Multiple same requests | Distributed Lock   |
| Huge traffic spike     | Queue              |
| Cache expiration spike | Request Coalescing |
| Service overload       | Circuit Breaker    |
| Too many users         | Rate Limiting      |
| Server overload        | Load Balancer      |

---

# Similar Real-World Examples

The Thundering Herd problem happens in:

* Flight booking
* IRCTC Tatkal
* Ticketmaster concert booking
* IPL ticket booking
* Flash sales
* Stock trading apps
* Crypto exchanges

---

# Interview Perspective

If interviewer asks:

> “How would you design a flight booking system handling 1 million concurrent users?”

Expected concepts:

* Distributed locks
* Idempotency
* Kafka queues
* Redis caching
* Optimistic locking
* Rate limiting
* Horizontal scaling
* Event-driven architecture

This is one of the classic distributed system design problems.




Request Coalescing means:

> If many requests ask for the SAME data at the SAME time, only one request goes to DB.
> Other requests wait for that result.

This prevents:

* DB overload
* Duplicate expensive queries
* Cache stampede
* Thundering herd problem

---

# Real Flight Example

Suppose cache expired for:

```text id="6ov7ta"
Flight AI-302 seats
```

Now suddenly:

```text id="6dqsrh"
10,000 users search same flight
```

Without coalescing:

```text id="rr8udj"
10,000 requests
      |
10,000 DB queries
```

Database gets destroyed.

---

# With Request Coalescing

```text id="3dg0jz"
Request 1 -> fetch DB
Request 2 -> wait
Request 3 -> wait
...
```

After DB responds:

```text id="5p0s6g"
Store result in cache
Return SAME response to all waiting requests
```

Now:

```text id="s7cv6h"
10,000 requests
      |
1 DB query only
```

Huge optimization.

---

# How It Works Internally

# Normal Flow

```text id="kt5d7f"
Client
   |
Cache Check
   |
Cache Miss
   |
DB Query
```

Problem:
every request independently queries DB.

---

# Coalescing Flow

```text id="5km8hy"
Client Requests
      |
Check Cache
      |
Cache Miss
      |
Acquire "in-flight" lock
      |
Only ONE request goes DB
      |
Others wait
```

---

# Core Idea

We maintain:

```js
inFlightRequests = {
   "flight_AI302": Promise
}
```

If request already running:

```text id="utwqjn"
Do NOT hit DB again
Reuse existing promise
```

---

# Node.js Example

```javascript
const cache = new Map();
const inFlight = new Map();

async function getFlight(flightId) {

  // 1. Return cache if available
  if (cache.has(flightId)) {
    return cache.get(flightId);
  }

  // 2. If request already running, wait for it
  if (inFlight.has(flightId)) {
    console.log("Waiting for existing request...");
    return inFlight.get(flightId);
  }

  // 3. Create DB request promise
  const promise = fetchFlightFromDB(flightId)
    .then((data) => {

      // store in cache
      cache.set(flightId, data);

      return data;
    })
    .finally(() => {

      // remove in-flight tracking
      inFlight.delete(flightId);
    });

  // 4. Store running request
  inFlight.set(flightId, promise);

  return promise;
}
```

---

# What Happens Here

Suppose 5000 users call:

```js
getFlight("AI302")
```

at same time.

Flow:

```text id="9tl74y"
First request:
    cache MISS
    DB call starts
    promise stored

Other 4999 requests:
    see promise already exists
    wait for SAME promise
```

Only:

```text id="5o5xw7"
ONE database query
```

executes.

---

# This Is Extremely Common In

| System         | Example                |
| -------------- | ---------------------- |
| Flight Booking | Seat availability      |
| IRCTC          | Tatkal search          |
| Netflix        | Popular movie metadata |
| E-commerce     | Product inventory      |
| Banking        | Account profile        |
| CDN            | File fetch             |
| API Gateway    | Token validation       |

---

# Advanced Distributed Version

Single server solution is easy.

But in microservices:

```text id="o9m0vq"
10 application servers
```

Each server may still hit DB once.

To solve globally:

Use:

* Redis distributed locks
* Shared cache
* Distributed promise registry

---

# Redis-Based Coalescing

Flow:

```text id="0w79o7"
Request
   |
Redis Lock SETNX
   |
Success? ---- YES ---> Query DB
   |                     |
   NO                    Cache result
   |                     |
Wait/Poll Cache <--------
```

---

# Example

## Server 1

```text id="0m9z2f"
SETNX flight_AI302_lock
```

Success.

Server 1 queries DB.

---

## Server 2

Lock already exists.

So:

```text id="1pc1qk"
DO NOT query DB
Wait for cache update
```

---

# This Prevents Cache Stampede

Cache Stampede means:

```text id="ny2k57"
Cache expires
Millions of requests hit DB together
```

Request coalescing is one major solution.

---

# Related Patterns

| Pattern            | Purpose                      |
| ------------------ | ---------------------------- |
| Request Coalescing | Combine duplicate requests   |
| Debouncing         | Ignore rapid repeated events |
| Batching           | Combine multiple operations  |
| Caching            | Avoid repeated computation   |
| Queueing           | Smooth traffic               |

---

# Interview-Level Important Point

Interviewer may ask:

> “How would you prevent cache stampede?”

Strong answer:

* Redis cache
* Request coalescing
* Distributed lock
* TTL randomization
* Background cache refresh

---

# Real Architecture

```text id="6qix2f"
Users
  |
API Servers
  |
Redis Cache
  |
Request Coalescing Layer
  |
PostgreSQL
```

This pattern is heavily used in:

* Google
* Amazon
* Netflix
* Uber
* Airline systems
* Stock exchanges
* High-scale backend systems
