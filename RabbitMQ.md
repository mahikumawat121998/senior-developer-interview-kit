Here are some important interview questions on RabbitMQ especially useful for Full Stack Developer, Backend Developer, and Microservices interviews.

---

# RabbitMQ Interview Questions

## Basic Questions

### 1. What is RabbitMQ?

RabbitMQ is a message broker that helps applications communicate asynchronously using queues.

It supports:

* Producer → sends message
* Queue → stores message
* Consumer → receives message

---

### 2. Why do we use RabbitMQ?

Common use cases:

* Microservices communication
* Async processing
* Background jobs
* Event-driven architecture
* Reducing tight coupling
* Retry mechanisms
* Load balancing

Example:

* Order service sends event
* Payment service consumes it asynchronously

---

### 3. What is a Queue in RabbitMQ?

A queue stores messages until consumers process them.

Producer → Exchange → Queue → Consumer

---

### 4. Difference between RabbitMQ and Kafka?

| RabbitMQ                 | Kafka                              |
| ------------------------ | ---------------------------------- |
| Message broker           | Distributed event streaming        |
| Queue-based              | Log-based                          |
| Best for task processing | Best for high-throughput streaming |
| Deletes after consume    | Retains messages                   |
| Easier routing           | Better scalability                 |

---

### 5. What are Exchanges in RabbitMQ?

Exchange decides how messages are routed to queues.

Types:

* Direct
* Topic
* Fanout
* Headers

---

## Exchange Types

### 6. Explain Direct Exchange

Routes messages using exact routing key match.

Example:

```js
routingKey = "payment"
```

Only queue bound with `"payment"` gets message.

---

### 7. Explain Fanout Exchange

Broadcasts message to all queues.

Use case:

* Notifications
* Live updates

---

### 8. Explain Topic Exchange

Uses pattern matching.

Example:

```txt
order.*
payment.#
```

Useful for event-driven systems.

---

### 9. Explain Headers Exchange

Routing based on message headers instead of routing key.

Less commonly used.

---

## Reliability & Message Handling

### 10. What is Message Acknowledgement?

Consumer tells RabbitMQ:
“I processed the message successfully.”

Without ACK:

* Message may be re-delivered

---

### 11. What happens if consumer crashes before ACK?

RabbitMQ requeues message and sends it to another consumer.

---

### 12. What is Durable Queue?

Queue survives broker restart.

```js
durable: true
```

---

### 13. Difference between Durable Queue and Persistent Message?

| Durable Queue          | Persistent Message       |
| ---------------------- | ------------------------ |
| Queue survives restart | Message survives restart |

For full durability:

* Queue must be durable
* Message must be persistent

---

### 14. What is Prefetch Count?

Limits number of unacknowledged messages per consumer.

Example:

```js
channel.prefetch(1)
```

Prevents one consumer from getting overloaded.

---

### 15. What is Dead Letter Queue (DLQ)?

Failed messages are moved to another queue.

Use cases:

* Retry
* Debugging
* Error tracking

---

### 16. How do retries work in RabbitMQ?

Usually implemented using:

* DLQ
* TTL
* Retry queue

Flow:

```txt
Main Queue → Retry Queue → Main Queue
```

---

## Advanced Questions

### 17. What is Publisher Confirm?

RabbitMQ confirms producer that message reached broker successfully.

Improves reliability.

---

### 18. What is Consumer Cancel Notification?

RabbitMQ informs consumer if queue gets deleted or unavailable.

---

### 19. What is Routing Key?

String used by exchange to route messages.

Example:

```txt
order.created
payment.completed
```

---

### 20. What is Binding?

Connection between:

* Exchange
* Queue

---

### 21. How RabbitMQ helps in Microservices?

RabbitMQ enables:

* Async communication
* Decoupling services
* Event-driven systems
* Scalability

Example:

```txt
User Service → RabbitMQ → Email Service
```

---

### 22. What are common RabbitMQ design patterns?

* Work Queue
* Pub/Sub
* RPC
* Event Bus
* Retry Pattern
* Saga Pattern

---

### 23. What is Work Queue Pattern?

Multiple consumers process jobs from same queue.

Used for:

* Image processing
* Email sending
* Report generation

---

### 24. What is Pub/Sub Pattern?

One message delivered to multiple consumers.

Uses Fanout Exchange.

---

### 25. What is RPC in RabbitMQ?

Client sends request and waits for response asynchronously.

Rarely preferred in microservices.

---

## Scaling & Performance

### 26. How do you scale RabbitMQ consumers?

Increase number of consumer instances.

RabbitMQ distributes messages automatically.

---

### 27. What is clustering in RabbitMQ?

Multiple RabbitMQ nodes work together for:

* High availability
* Scalability

---

### 28. What is Mirrored Queue / Quorum Queue?

Replicates queues across nodes.

Quorum queues are modern replacement for mirrored queues.

---

### 29. What is TTL in RabbitMQ?

Time-to-live for:

* Messages
* Queues

Expired messages can move to DLQ.

---

### 30. What monitoring tools are used with RabbitMQ?

* RabbitMQ Management Plugin
* Prometheus
* Grafana

---

# Scenario-Based Questions

### 31. How would you prevent duplicate message processing?

Techniques:

* Idempotency
* Unique transaction IDs
* Database locking

---

### 32. How do you handle failed messages?

* DLQ
* Retry strategy
* Logging
* Alerting

---

### 33. What happens if RabbitMQ server goes down?

Without clustering:

* Messaging stops

With durability:

* Messages recover after restart

---

### 34. How would you design notification service using RabbitMQ?

Example:

```txt
User Service
   ↓
RabbitMQ Exchange
   ↓
Email Queue
SMS Queue
Push Notification Queue
```

---

# Node.js + RabbitMQ Questions

### 35. Which library is commonly used in Node.js?

Popular library:

```bash
amqplib
```

---

### 36. Difference between sendToQueue and publish?

| sendToQueue             | publish            |
| ----------------------- | ------------------ |
| Directly sends to queue | Sends via exchange |

---

### 37. How do you consume messages in Node.js?

Example:

```js
channel.consume(queue, (msg) => {
   console.log(msg.content.toString());
   channel.ack(msg);
});
```

---

# Important Interview Cross Questions

## If interviewer asks:

### “Why not use REST instead of RabbitMQ?”

Answer:
REST is synchronous and tightly coupled.
RabbitMQ enables:

* Async processing
* Better scalability
* Retry handling
* Loose coupling

---

### “How do you ensure message reliability?”

Answer:

* Durable queues
* Persistent messages
* ACKs
* Publisher confirms
* DLQ

---

### “What is idempotency in RabbitMQ?”

Answer:
Processing same message multiple times should not create duplicate effects.

Example:

* Prevent duplicate payment deduction.

---

# Most Important Topics for Interviews

Focus heavily on:

* Exchanges
* ACK/NACK
* DLQ
* Retry mechanism
* Durable queues
* Prefetch count
* Pub/Sub
* RabbitMQ vs Kafka
* Microservices integration
* Idempotency
* Scaling consumers
