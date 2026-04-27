# MongoDB Advanced Interview Notes Pack

---

# 1. Data Modeling (Advanced)

## Query-First Design (Golden Rule)

Design schema based on **read & write patterns**, not relations.

### Patterns

* One-to-Few → Embed
* One-to-Many → Hybrid
* Many-to-Many → Reference

### Anti-Patterns

* Over-normalization (SQL mindset)
* Huge growing arrays (unbounded arrays)

### Example (Hybrid - Production Ready)

```js
{
  orderId: 1,
  userId: ObjectId("u1"),
  products: [
    { productId: "p1", name: "Shoes", price: 2000 }
  ],
  total: 2000,
  createdAt: ISODate()
}
```

---

# 2. Indexing (Deep Dive)

## Index Types

* Single Field
* Compound
* Multikey (arrays)
* Text
* TTL
* Sparse / Partial

## Compound Index Rule (VERY IMPORTANT)

👉 Order matters!

```js
db.car.createIndex({ brand: 1, price: -1 })
```

Works for:

* brand
* brand + price
  ❌ Not for price alone

## Covered Query

👉 Query served only from index

```js
db.car.find({ brand: "Hyundai" }, { brand: 1, _id: 0 })
```

## Explain Plan (MUST KNOW)

```js
db.car.find({ brand: "Hyundai" }).explain("executionStats")
```

Check:

* COLLSCAN ❌
* IXSCAN ✅

---

# 3. Aggregation Pipeline (Advanced)

## Pipeline Order Optimization

1. $match (early filter)
2. $project (reduce fields)
3. $group
4. $sort

---

## Complex Pipeline (Real Interview)

### Problem:

Get total sales per user with product details

```js
db.orders.aggregate([
  { $match: { status: "completed" } },
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" },
  {
    $group: {
      _id: "$user.name",
      totalSpent: { $sum: "$total" }
    }
  },
  { $sort: { totalSpent: -1 } }
])
```

---

## $facet (Parallel Pipelines)

```js
db.car.aggregate([
  {
    $facet: {
      expensive: [ { $match: { price: { $gt: 1000000 } } } ],
      cheap: [ { $match: { price: { $lte: 1000000 } } } ]
    }
  }
])
```

---

## $bucket (Grouping Ranges)

```js
{
  $bucket: {
    groupBy: "$price",
    boundaries: [0, 500000, 1000000, 2000000],
    default: "Other",
    output: { count: { $sum: 1 } }
  }
}
```

---

## $addFields vs $project

* $addFields → adds
* $project → reshapes/removes

---

# 4. $lookup Optimization

## Pipeline Lookup (Advanced)

```js
{
  $lookup: {
    from: "orders",
    let: { userId: "$_id" },
    pipeline: [
      { $match: { $expr: { $eq: ["$userId", "$$userId"] } } }
    ],
    as: "orders"
  }
}
```

---

# 5. Transactions (Important)

## When to use

* Financial systems
* Multiple collection updates

```js
session.startTransaction()
```

## Limitation

* Slower
* Not always needed in MongoDB

---

# 6. Sharding (System Design)

## What is Sharding?

Distributing data across multiple servers

## Shard Key (CRITICAL)

* High cardinality
* Even distribution
* Frequently queried

---

# 7. Performance Optimization

## Tips

* Use indexes wisely
* Avoid large documents
* Limit array size
* Use projection

---

# 8. Common Interview Traps

❌ Using string for numbers
❌ Forgetting index order
❌ Not using $unwind after $lookup
❌ Overusing $lookup (joins)

---

# 9. Real-World Design Question

## Design Instagram Feed

### Collections:

* users
* posts
* followers

### Strategy:

* Store recent posts embedded (fast read)
* Use fan-out on write

---

# 10. Rapid Fire Answers

Q: Why MongoDB?
👉 Flexible schema, scalability

Q: Index drawback?
👉 Slows writes

Q: $lookup vs SQL JOIN?
👉 Slower, but flexible

Q: Embed vs Reference?
👉 Depends on query pattern

Good—this is a **frequently asked interview question**. Don’t just list them—understand *when to use each*. I’ll keep it practical.

---

# 🔥 Types of Indexes in MongoDB

---

## ✅ 1. Single Field Index

👉 Index on one field

```js
db.car_details.createIndex({ brand: 1 })
```

* `1` → ascending
* `-1` → descending

✔️ Use when querying by one field

---

## ✅ 2. Compound Index (VERY IMPORTANT 🔥)

👉 Index on multiple fields

```js
db.car_details.createIndex({ brand: 1, fuel_type: 1 })
```

✔️ Use when query has multiple fields:

```js
db.car_details.find({
  brand: "Hyundai",
  fuel_type: "Diesel"
})
```

⚠️ Order matters:

```js
{ brand: 1, fuel_type: 1 } ✅ works
{ fuel_type: 1, brand: 1 } ❌ may not be optimal
```

---

## ✅ 3. Multikey Index

👉 Used when field is an **array**

```js
{
  name: "Thar",
  features: ["ABS", "Airbags"]
}
```

```js
db.car_details.createIndex({ features: 1 })
```

✔️ MongoDB automatically creates multikey index

---

## ✅ 4. Text Index

👉 For search (like Google 🔍)

```js
db.articles.createIndex({ title: "text" })
```

```js
db.articles.find({
  $text: { $search: "mongodb" }
})
```

✔️ Used in blogs, search features

---

## ✅ 5. Unique Index

👉 Prevent duplicate values

```js
db.users.createIndex({ email: 1 }, { unique: true })
```

✔️ Used for email, username, etc.

---

## ✅ 6. Sparse Index

👉 Only index documents where field exists

```js
db.users.createIndex({ phone: 1 }, { sparse: true })
```

✔️ Skips documents without `phone`

---

## ✅ 7. TTL Index (Time-To-Live)

👉 Automatically deletes data after time

```js
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })
```

✔️ Used for:

* OTPs
* Sessions
* Logs

---

## ✅ 8. Hashed Index

👉 Used for **sharding / even distribution**

```js
db.users.createIndex({ userId: "hashed" })
```

✔️ Distributes data evenly

---

## ✅ 9. Wildcard Index

👉 Index all fields dynamically

```js
db.collection.createIndex({ "$**": 1 })
```

✔️ Useful when schema is dynamic

---

## ✅ 10. Geospatial Index

👉 For location-based queries

```js
db.places.createIndex({ location: "2dsphere" })
```

✔️ Used in:

* Maps
* Nearby search

---

# 🧠 Quick Summary Table

| Index Type | Use Case               |
| ---------- | ---------------------- |
| Single     | Basic queries          |
| Compound   | Multi-field queries 🔥 |
| Multikey   | Arrays                 |
| Text       | Search                 |
| Unique     | Prevent duplicates     |
| Sparse     | Optional fields        |
| TTL        | Auto delete            |
| Hashed     | Sharding               |
| Wildcard   | Dynamic schema         |
| Geospatial | Location               |

---

# ⚠️ Interview Traps

❌ Forgetting **order in compound index**
❌ Creating too many indexes
❌ Indexing low-cardinality fields (bad performance)

---

# 🚀 Pro Insight (Say this in interview)

👉 “I choose indexes based on query patterns and use compound indexes for frequent multi-field queries.”

---

If you want next level:
I can:

* Give **real-world indexing strategy for your project (real estate app)**
* Ask you **interview questions on indexes**
* Teach **how MongoDB chooses index internally (query planner)**

Just say:
👉 “take my index interview”
