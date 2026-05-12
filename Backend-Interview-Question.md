Question 1. WHat is the CAP theorem in Distributed System?
Ans:
I think you mean **CAP Theorem** in backend/distributed systems.

The **CAP Theorem** says that a distributed system can guarantee only **2 out of these 3 properties at the same time**:

1. **Consistency (C)**
2. **Availability (A)**
3. **Partition Tolerance (P)**

---

# 1. Consistency (C)

Every user gets the **same latest data** from every server.

Example:

* User updates balance → ₹5000
* Immediately all servers show ₹5000

No stale/old data.

---

# 2. Availability (A)

System always responds to requests.

Even if some servers fail, users still get a response.

Example:

* You hit API
* Server always returns data
* But maybe old/stale data

---

# 3. Partition Tolerance (P)

System continues working even if servers cannot communicate with each other due to network failure.

Example:

* Mumbai server cannot talk to Delhi server
* Still application keeps running

In distributed systems, network partition can happen anytime, so **P is almost mandatory**.

---

# Why CAP Theorem Exists

In distributed systems:

* multiple servers
* multiple regions
* microservices
* replicated databases

Network failures can happen.

During partition, system must choose:

* either give correct/latest data (**Consistency**)
* or keep system responsive (**Availability**)

Cannot fully guarantee both simultaneously.

---

# Real-World Example

Suppose:

* Database replicated in Mumbai and Delhi
* Network connection breaks

Now user updates profile in Mumbai.

Delhi server does not know about update.

Now what should Delhi do?

---

## Option 1 → CP System

Delhi refuses request until sync happens.

Result:

✅ Consistency
✅ Partition tolerance
❌ Availability

Because system may reject requests.

---

## Option 2 → AP System

Delhi still serves old data.

Result:

✅ Availability
✅ Partition tolerance
❌ Strong consistency

Because users may see stale data.

---

# CA System?

CA means:

* Consistency
* Availability

But no Partition Tolerance.

This is possible only when:

* single server
* no distributed network

Example:

* Traditional monolithic SQL server

But in modern cloud systems, partitions are unavoidable.

---

# Types of Databases Based on CAP

| Database Type    | CAP Choice       |
| ---------------- | ---------------- |
| MongoDB          | CP               |
| Apache Cassandra | AP               |
| Redis            | Mostly CP        |
| Amazon DynamoDB  | AP               |
| PostgreSQL       | CA (single node) |

---

# Important Interview Point

Most modern systems are actually:

## Eventually Consistent

Meaning:

Data may be temporarily inconsistent, but after some time all replicas become synchronized.

Used heavily in:

* social media
* distributed caches
* e-commerce
* NoSQL databases

---

# Easy Way to Remember

| Property | Meaning                       |
| -------- | ----------------------------- |
| C        | Same latest data everywhere   |
| A        | Always responds               |
| P        | Works despite network failure |

And during partition:

> Choose either C or A.

---

# Backend System Design Perspective

CAP theorem is important for:

* Microservices
* Distributed databases
* Replication
* Caching systems
* Global applications
* Load balancing
* Multi-region deployments

Example decisions:

* Banking → prefer CP
* Instagram likes/comments → prefer AP

Because banking needs correctness, while social media prefers uptime/speed.
