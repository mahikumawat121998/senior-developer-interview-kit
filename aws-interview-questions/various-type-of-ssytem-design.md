System design patterns are reusable solutions to common scalability, reliability, performance, and distributed-system problems.

These patterns are heavily used in:

* scalable backend systems
* microservices
* cloud systems
* distributed architectures
* high-traffic applications

---

# 1. API Gateway Pattern

A single entry point for all client requests.

```txt id="e9y7rr"
Client
   ↓
API Gateway
   ↓
Services
```

### Responsibilities

* Authentication
* Authorization
* Rate limiting
* Routing
* SSL termination
* Request aggregation
* Caching

### Technologies

* Amazon Web Services API Gateway
* Kong
* NGINX
* Traefik

### Best For

* Microservices architecture

---

# 2. Load Balancer Pattern

Distributes traffic across servers.

```txt id="l4p3m2"
Users
 ↓
Load Balancer
 ↓ ↓ ↓
S1 S2 S3
```

### Algorithms

* Round Robin
* Least Connections
* IP Hash
* Weighted Routing

### Types

* Layer 4
* Layer 7

### Examples

* Amazon Web Services ALB
* NGINX
* HAProxy

---

# 3. Circuit Breaker Pattern

Prevents cascading failures.

If service B fails repeatedly:

* stop calling it temporarily

```txt id="ybz6dw"
Service A → Service B ❌
Circuit Opens
```

### States

* Closed
* Open
* Half-open

### Benefits

* Fault tolerance
* System stability

### Libraries

* Resilience4j
* Hystrix

---

# 4. Retry Pattern

Retry failed requests automatically.

### Retry Strategies

* Fixed delay
* Exponential backoff
* Jitter

### Example

```txt id="p7z9h0"
Try 1 ❌
Try 2 ❌
Try 3 ✅
```

### Important

Without backoff:

* retries can overload system

---

# 5. Bulkhead Pattern

Isolate failures between components.

Like ship compartments.

```txt id="fv7h7y"
Payment Service resources
≠
Notification Service resources
```

If one fails:

* others continue working

---

# 6. Cache-Aside Pattern

Application checks cache first.

```txt id="w4ld26"
Request
 ↓
Cache?
 ↓
DB
```

### Flow

1. Check cache
2. Miss → query DB
3. Store in cache

### Technologies

* Redis
* Memcached

### Very Common Interview Question

---

# 7. Read-Through Cache Pattern

Cache itself fetches data from DB.

Application only talks to cache.

```txt id="j9o0va"
App → Cache → DB
```

---

# 8. Write-Through Cache Pattern

Write to:

* cache
* DB simultaneously

### Advantage

Always consistent cache.

### Disadvantage

Higher write latency.

---

# 9. Write-Behind (Write-Back) Pattern

Write to cache first.

DB updated asynchronously later.

### Advantage

Fast writes.

### Risk

Possible data loss.

---

# 10. CQRS Pattern

Separate:

* Read model
* Write model

```txt id="d7h9gc"
Command → Write DB
Query → Read DB
```

### Benefits

* Better scalability
* Optimized reads

---

# 11. Event Sourcing Pattern

Store events instead of current state.

```txt id="1b9mkt"
Order Created
Order Paid
Order Shipped
```

Current state rebuilt from events.

### Best For

* Audit systems
* Banking

---

# 12. Saga Pattern

Manages distributed transactions.

Very important in microservices.

---

## Choreography Saga

Services communicate via events.

```txt id="g22wqe"
Order Created
→ Payment
→ Inventory
→ Shipping
```

---

## Orchestration Saga

Central orchestrator controls flow.

```txt id="7z6t9k"
Orchestrator
   ↓
Payment
Inventory
Shipping
```

### Solves

Distributed transaction problem.

---

# 13. Database per Service Pattern

Each microservice owns its own DB.

```txt id="vltjjf"
Auth DB
User DB
Order DB
```

You already use this concept.

### Benefits

* Loose coupling
* Independent scaling

---

# 14. Shared Database Pattern

Multiple services use same DB.

### Simpler initially

But:

* tight coupling
* scaling issues

---

# 15. Strangler Fig Pattern

Gradually migrate monolith → microservices.

```txt id="lc95fu"
New features → microservices
Old features → monolith
```

Very common in enterprises.

---

# 16. Sidecar Pattern

Attach helper container beside main service.

Mostly in Kubernetes.

```txt id="4v9fzc"
App Container
+ Logging Container
+ Monitoring Container
```

### Used For

* logging
* monitoring
* proxies

### Example

Istio sidecar proxy.

---

# 17. Ambassador Pattern

Proxy handles outbound communication.

```txt id="0efh15"
App → Ambassador → External Service
```

---

# 18. Adapter Pattern

Converts incompatible interfaces.

Example:

* old payment API
* new payment API

Application remains unchanged.

---

# 19. Proxy Pattern

Acts as intermediary.

### Types

* Reverse proxy
* Forward proxy

### Examples

* NGINX
* Envoy

---

# 20. Publisher-Subscriber (Pub/Sub) Pattern

Publishers emit events.
Subscribers consume them.

```txt id="n4gn41"
Publisher → Kafka → Consumers
```

### Technologies

* Apache Kafka
* Amazon Web Services SNS
* RabbitMQ

---

# 21. Queue-Based Load Leveling

Queue absorbs traffic spikes.

```txt id="y2d8f6"
Users
 ↓
Queue
 ↓
Workers
```

### Benefits

* prevents overload
* async processing

---

# 22. Leader Election Pattern

One node becomes leader.

Used in:

* distributed systems
* Kubernetes

### Example

Only one scheduler should run.

---

# 23. Sharding Pattern

Split database horizontally.

```txt id="kwg0ok"
Users A-M → DB1
Users N-Z → DB2
```

### Benefits

* scalability

### Challenges

* resharding
* joins

---

# 24. Replication Pattern

Duplicate data across servers.

### Types

* Master-Slave
* Multi-master

### Benefits

* high availability
* read scaling

---

# 25. Distributed Cache Pattern

Shared cache across servers.

### Example

```txt id="kuxrxk"
App1
App2 → Redis Cluster
App3
```

---

# 26. Rate Limiting Pattern

Controls request volume.

### Algorithms

* Token Bucket
* Leaky Bucket
* Sliding Window
* Fixed Window

You recently discussed this.

---

# 27. Idempotency Pattern

Repeated requests produce same result.

Very important in:

* payment APIs
* retry systems

### Example

Duplicate payment should not happen.

---

# 28. Backend for Frontend (BFF)

Separate backend per frontend.

```txt id="s8o4n3"
Mobile Backend
Web Backend
Admin Backend
```

### Benefits

* optimized responses

---

# 29. Webhook Pattern

Server pushes events to another service.

Example:

```txt id="f5g6yo"
Payment Success
→ webhook to merchant
```

---

# 30. Leader-Follower Replication

Leader handles writes.
Followers handle reads.

```txt id="f6hf0j"
Write → Primary DB
Read → Replica DB
```

---

# 31. Blue-Green Deployment Pattern

Two environments:

* Blue (old)
* Green (new)

Traffic switches gradually.

### Benefits

* zero downtime deployment

---

# 32. Canary Deployment Pattern

Release to small percentage first.

```txt id="r2v9wh"
5% users → new version
95% → old version
```

---

# 33. Feature Toggle Pattern

Enable/disable features dynamically.

### Benefits

* safe deployments
* A/B testing

---

# 34. Distributed Lock Pattern

Prevent concurrent modification.

### Example

Only one worker processes payment.

### Technologies

* Redis Redlock
* ZooKeeper

---

# 35. Materialized View Pattern

Precomputed query results.

### Useful For

* analytics
* dashboards

---

# 36. Outbox Pattern

Ensures DB update + event publishing consistency.

### Problem

DB updated but Kafka publish failed.

### Solution

Write event to outbox table first.

Very important in microservices.

---

# 37. Inbox Pattern

Prevents duplicate event processing.

---

# 38. API Composition Pattern

Combine multiple service responses.

```txt id="mkgjqz"
Gateway
 → User Service
 → Order Service
 → Payment Service
```

---

# 39. Service Discovery Pattern

Services discover each other dynamically.

### Examples

* Eureka
* Consul
* Kubernetes DNS

---

# 40. Leaderless Architecture

No central leader.

Example:

* Cassandra
* DynamoDB

High availability focused.

---

# Most Important Patterns For Interviews

Focus heavily on these:

| Priority | Pattern               |
| -------- | --------------------- |
| High     | API Gateway           |
| High     | Load Balancer         |
| High     | Cache Aside           |
| High     | Circuit Breaker       |
| High     | Retry                 |
| High     | CQRS                  |
| High     | Saga                  |
| High     | Pub/Sub               |
| High     | Database per Service  |
| High     | Outbox Pattern        |
| High     | Rate Limiting         |
| High     | Sharding              |
| High     | Replication           |
| High     | Idempotency           |
| High     | Blue-Green Deployment |

---

# Most Important For Your Career Path

Since you're building:

* Node.js microservices
* multi-tenant systems
* AWS architecture

You should deeply master:

```txt id="5s30hz"
API Gateway
→ Saga Pattern
→ Outbox Pattern
→ CQRS
→ Distributed Cache
→ Pub/Sub
→ Idempotency
→ Circuit Breaker
→ Database per Service
→ Sharding
```

These are heavily asked in:

* senior backend interviews
* solution architect interviews
* scalable SaaS discussions
* distributed systems rounds.
