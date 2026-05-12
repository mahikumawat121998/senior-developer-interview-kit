Here are the most important interview questions on Apache Kafka for Backend, Full Stack, Microservices, and System Design interviews.

---

# Apache Kafka Interview Questions

# Basic Questions

### 1. What is Kafka?

Kafka is a distributed event streaming platform used for:

* Real-time data streaming
* Event-driven architecture
* High-throughput messaging
* Log aggregation
* Analytics pipelines

---

### 2. Why do we use Kafka?

Kafka is used for:

* Handling huge volumes of events
* Async communication
* Real-time processing
* Decoupling microservices
* Event sourcing

Example:

```txt id="5v7ydv"
Order Service → Kafka → Payment Service → Notification Service
```

---

### 3. What are the main components of Kafka?

Main components:

* Producer
* Consumer
* Broker
* Topic
* Partition
* Zookeeper (older versions)
* Consumer Group

---

### 4. What is a Topic in Kafka?

A topic is a logical channel where messages are stored.

Example:

```txt id="kn7n6w"
order-created
payment-events
user-events
```

---

### 5. What is a Partition in Kafka?

Partitions split topic data for:

* Scalability
* Parallel processing

Each partition maintains message order.

---

### 6. What is a Kafka Broker?

A Kafka server that stores and manages messages.

Cluster = multiple brokers.

---

### 7. What is a Producer?

Application that sends messages to Kafka topics.

---

### 8. What is a Consumer?

Application that reads messages from Kafka topics.

---

# Consumer Group Questions

### 9. What is a Consumer Group?

Multiple consumers working together.

Kafka distributes partitions among consumers.

---

### 10. Can two consumers read same partition in same group?

No.

One partition → one consumer within same group.

---

### 11. What happens if consumers are more than partitions?

Extra consumers remain idle.

Example:

```txt id="mnghzn"
3 partitions
5 consumers
→ 2 consumers idle
```

---

### 12. What happens if a consumer crashes?

Kafka automatically rebalances partitions to other consumers.

---

# Offset Questions

### 13. What is Offset in Kafka?

Unique identifier for each message in partition.

Used for tracking consumption.

---

### 14. How Kafka maintains message ordering?

Ordering is guaranteed only within a partition.

---

### 15. What is Offset Commit?

Consumer tells Kafka:
“I successfully processed messages till this offset.”

---

### 16. Difference between Auto Commit and Manual Commit?

| Auto Commit       | Manual Commit           |
| ----------------- | ----------------------- |
| Automatic         | Controlled by developer |
| Easier            | More reliable           |
| Risk of data loss | Better control          |

---

# Reliability Questions

### 17. What is Replication in Kafka?

Partitions are replicated across brokers for fault tolerance.

---

### 18. What is Leader and Follower?

Leader handles:

* Reads
* Writes

Followers replicate data from leader.

---

### 19. What happens if broker fails?

Follower becomes new leader automatically.

---

### 20. What is ISR in Kafka?

ISR = In-Sync Replicas

Replicas fully synced with leader.

---

### 21. What is ACKS in Kafka Producer?

| ACK Value | Meaning                      |
| --------- | ---------------------------- |
| 0         | No acknowledgement           |
| 1         | Leader acknowledgement       |
| all       | All replicas acknowledgement |

---

### 22. What is Exactly Once Semantics?

Kafka ensures message processed only once.

Achieved using:

* Idempotent producer
* Transactions

---

# Advanced Questions

### 23. Difference between RabbitMQ and Kafka?

| Kafka              | RabbitMQ              |
| ------------------ | --------------------- |
| Event streaming    | Message broker        |
| High throughput    | Complex routing       |
| Retains messages   | Deletes after consume |
| Partition-based    | Queue-based           |
| Best for analytics | Best for task queues  |

---

### 24. What is Retention Period?

Kafka stores messages for configured duration even after consumption.

Example:

```txt id="xck7b5"
7 days retention
```

---

### 25. What is Log Compaction?

Kafka keeps latest value for same key.

Useful for:

* State management
* Event sourcing

---

### 26. What is Rebalancing?

Redistribution of partitions among consumers.

Occurs when:

* Consumer joins
* Consumer leaves

---

### 27. What is Idempotent Producer?

Prevents duplicate message production.

---

### 28. What is Event-Driven Architecture?

Services communicate using events instead of direct API calls.

---

### 29. What is Event Sourcing?

Application state stored as sequence of events.

---

### 30. What is Kafka Streams?

Library for stream processing.

Used for:

* Filtering
* Aggregation
* Transformation

---

# Scenario-Based Questions

### 31. How would you design order processing using Kafka?

Flow:

```txt id="v6g7k5"
Order Service
   ↓
Kafka Topic
   ↓
Inventory Service
Payment Service
Notification Service
```

---

### 32. How do you avoid duplicate processing?

Techniques:

* Idempotency
* Unique event IDs
* Transactions

---

### 33. How do you scale Kafka consumers?

Increase:

* Consumer instances
* Partitions

---

### 34. What happens if message processing is slow?

Consumer lag increases.

---

### 35. What is Consumer Lag?

Difference between:

* Latest offset
* Consumer offset

Indicates delay in processing.

---

# Node.js Kafka Questions

### 36. Which libraries are used in Node.js?

Popular libraries:

* `kafkajs`
* `node-rdkafka`

---

### 37. Example of Kafka Producer in Node.js

```js id="2l5xgk"
await producer.send({
  topic: "orders",
  messages: [{ value: JSON.stringify(order) }],
});
```

---

### 38. Example of Kafka Consumer

```js id="7mjlwm"
await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log(message.value.toString());
  },
});
```

---

# System Design Questions

### 39. Why Kafka is highly scalable?

Because of:

* Partitioning
* Distributed brokers
* Sequential disk writes

---

### 40. Why Kafka is fast?

Kafka uses:

* Sequential I/O
* Zero-copy optimization
* Batching

---

### 41. How Kafka achieves fault tolerance?

Using:

* Replication
* ISR
* Automatic leader election

---

### 42. When should NOT use Kafka?

Avoid Kafka for:

* Small/simple systems
* Complex routing needs
* Immediate request-response systems

---

# Important Cross Questions

## “Why Kafka instead of REST APIs?”

Answer:
REST is synchronous.
Kafka enables:

* Async communication
* High scalability
* Event replay
* Loose coupling

---

## “Why Kafka instead of RabbitMQ?”

Answer:
Kafka is better for:

* Event streaming
* Real-time analytics
* Big data pipelines

RabbitMQ is better for:

* Task queues
* Complex routing
* Short-lived messages

---

## “How Kafka guarantees durability?”

Answer:
Using:

* Replication
* Disk persistence
* ACKS
* ISR

---

# Most Important Kafka Topics for Interviews

Focus strongly on:

* Partitions
* Consumer groups
* Offsets
* Replication
* Leader/Follower
* ISR
* Rebalancing
* Consumer lag
* Kafka vs RabbitMQ
* Exactly once semantics
* Event-driven architecture
* Scaling Kafka



Question What is the role of Offset Inside Kafka?
Ans;
In Apache Kafka, an **offset** is a unique number assigned to each message inside a partition.

It helps Kafka track:

* Which messages are already consumed
* Which message should be read next

---

# Simple Example

Suppose a partition contains messages like this:

| Offset | Message           |
| ------ | ----------------- |
| 0      | Order Created     |
| 1      | Payment Success   |
| 2      | Email Sent        |
| 3      | Invoice Generated |

Here:

* Offset `0` → first message
* Offset `1` → second message
* and so on

---

# Main Role of Offset

## 1. Track Consumer Progress

Kafka consumers use offsets to know:

> “Which messages have I already processed?”

Example:

* Consumer processed till offset `2`
* Next read starts from offset `3`

---

# 2. Message Replay

Kafka stores messages even after consumption.

So consumer can:

* Re-read old messages
* Restart from earlier offset

Example:

```txt id="qgq0x0"
Consumer crashes at offset 50
Restart from offset 51
```

This is one of Kafka’s biggest advantages.

---

# 3. Fault Tolerance

If consumer crashes:

* Kafka remembers committed offset
* Consumer resumes from last committed offset

This prevents:

* Data loss
* Missing events

---

# 4. Parallel Processing

Each partition has its own offsets.

Example:

```txt id="4v5r8l"
Partition 0 → offsets 0,1,2
Partition 1 → offsets 0,1,2
```

Offsets are partition-specific.

---

# 5. Consumer Group Coordination

Kafka tracks offsets separately for each consumer group.

Example:

| Consumer Group  | Current Offset |
| --------------- | -------------- |
| payment-group   | 120            |
| analytics-group | 85             |

Same message can be consumed independently by multiple groups.

---

# Offset Commit

After processing messages, consumer commits offset.

This tells Kafka:

> “I processed messages till here.”

---

# Auto Commit vs Manual Commit

| Auto Commit                 | Manual Commit             |
| --------------------------- | ------------------------- |
| Kafka commits automatically | Developer controls commit |
| Easier                      | More reliable             |
| Risk of losing messages     | Better control            |

---

# Important Interview Concept

## Offset ≠ Message ID

Offsets are:

* Sequential positions
* Only unique inside a partition

Not globally unique.

---

# Real Interview Example

## Suppose:

```txt id="jlwm0n"
Topic → 3 partitions
```

Partition 0:

```txt id="kr1s96"
offset 0
offset 1
offset 2
```

Partition 1:

```txt id="gy35ew"
offset 0
offset 1
```

Notice:

* Offset numbering restarts per partition.

---

# Common Cross Question

## “What happens if offset is not committed?”

Then after restart:

* Consumer may read same messages again
* Duplicate processing can happen

That’s why:

* Idempotency is important

---

# Very Important Line for Interviews

You can say:

> “Offset in Kafka acts like a checkpoint that helps consumers track message consumption and recover safely after failures.”
