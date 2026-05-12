## Amazon Web Services Route 53 Interview Questions & Answers

### 1. What is Route 53?

Route 53 is AWS’s scalable DNS (Domain Name System) service used to route user traffic to applications, servers, ELB, CloudFront, S3, etc.

---

### 2. Why is it called Route 53?

* “Route” → routes traffic
* “53” → DNS uses port 53

---

### 3. What are the main features of Route 53?

* Domain registration
* DNS routing
* Health checks
* Traffic management
* Failover support
* Highly available & scalable

---

### 4. What is DNS?

DNS converts domain names into IP addresses.

Example:
`google.com → 142.x.x.x`

---

### 5. What is a Hosted Zone?

Hosted Zone is a container for DNS records of a domain.

Example:
`example.com`

Contains:

* A record
* CNAME
* MX
* TXT etc.

---

### 6. Difference between Public and Private Hosted Zone?

| Public Hosted Zone       | Private Hosted Zone        |
| ------------------------ | -------------------------- |
| Accessible from internet | Accessible only inside VPC |
| Public websites          | Internal applications      |

---

### 7. What is an A Record?

Maps domain → IPv4 address.

Example:
`app.com → 192.168.1.1`

---

### 8. What is a CNAME Record?

Maps one domain to another domain.

Example:
`api.app.com → app.elb.amazonaws.com`

---

### 9. What is Alias Record in Route 53?

AWS-specific feature used to point domain directly to AWS resources like:

* ALB
* CloudFront
* S3

Advantage:

* No extra DNS query charges
* Root domain supported

---

### 10. Difference between Alias and CNAME?

| Alias                       | CNAME                     |
| --------------------------- | ------------------------- |
| AWS-specific                | Standard DNS              |
| Works on root domain        | Root domain not supported |
| Free query to AWS resources | Extra DNS lookup          |

---

### 11. What is TTL in DNS?

TTL (Time To Live) defines how long DNS response is cached.

Low TTL:

* Faster updates
* More DNS queries

High TTL:

* Better performance
* Slower DNS update propagation

---

### 12. What routing policies are available in Route 53?

* Simple Routing
* Weighted Routing
* Latency-based Routing
* Failover Routing
* Geolocation Routing
* Geoproximity Routing
* Multi-value Routing

---

### 13. What is Weighted Routing?

Distributes traffic based on percentage.

Example:

* Server A → 80%
* Server B → 20%

Useful for:

* A/B testing
* Gradual deployments

---

### 14. What is Latency-Based Routing?

Routes users to server with lowest latency.

Improves performance for global users.

---

### 15. What is Failover Routing?

Used for disaster recovery.

Primary server fails → traffic redirected to secondary server automatically.

Uses health checks.

---

### 16. What is Geolocation Routing?

Routes traffic based on user geographic location.

Example:

* India users → Indian server
* US users → US server

---

### 17. What is Multi-Value Routing?

Returns multiple healthy IPs for one domain.

Improves availability and load distribution.

---

### 18. What are Health Checks in Route 53?

Monitors endpoint health using:

* HTTP
* HTTPS
* TCP

If endpoint unhealthy:

* Route 53 stops sending traffic.

---

### 19. Can Route 53 work outside AWS?

Yes. It can manage DNS for any infrastructure, not only AWS.

---

### 20. How does Route 53 support High Availability?

* Global AWS infrastructure
* Health checks
* Failover routing
* Multiple DNS servers

---

### 21. What is DNS Propagation?

Time taken for DNS changes to spread globally.

Affected by TTL values.

---

### 22. How Route 53 integrates with CloudFront and ALB?

Route 53 uses Alias records to directly route traffic to:

* Amazon CloudFront
* Elastic Load Balancing

---

### 23. Scenario Question:

**How would you achieve zero downtime deployment using Route 53?**

Answer:

* Create two environments (Blue/Green)
* Use weighted routing or failover routing
* Shift traffic gradually to new version
* Rollback easily if issue occurs

---

### 24. Scenario Question:

**How would you route users to nearest server globally?**

Answer:
Use:

* Latency-based routing
  or
* Geolocation routing

---

### 25. Scenario Question:

**How can Route 53 help in Disaster Recovery?**

Answer:

* Configure health checks
* Use failover routing
* Maintain secondary standby region
* Automatically redirect traffic if primary region fails


Question what is difference between alias record and CNAME records?
Ans:
## Alias Record vs CNAME Record in Amazon Route 53

| Feature             | Alias Record                        | CNAME Record             |
| ------------------- | ----------------------------------- | ------------------------ |
| Type                | AWS-specific                        | Standard DNS             |
| Points To           | AWS resources (ALB, CloudFront, S3) | Another domain name      |
| Root Domain Support | Yes (`example.com`)                 | No                       |
| Extra DNS Lookup    | No                                  | Yes                      |
| Cost                | Free for AWS targets                | Normal DNS query charges |
| Performance         | Faster                              | Slightly slower          |
| Usage               | AWS infrastructure                  | General domain mapping   |

---

## Example of CNAME

```txt id="1"
api.example.com → myapp.cloudfront.net
```

Here:

* `api.example.com`
* points to another domain

Cannot use on:

```txt id="2"
example.com
```

---

## Example of Alias Record

```txt id="3"
example.com → CloudFront Distribution
```

Route 53 directly maps root domain to AWS resource.

Works with:

* CloudFront
* ALB
* S3 website
* API Gateway

---

## Main Interview Answer

> Alias is an AWS-specific optimized DNS record that can point root domains directly to AWS resources, while CNAME is a standard DNS record that maps one domain name to another domain name.






Question 
Ans:
Yes, you are thinking correctly.
Amazon CloudFront provides a domain like:

```txt id="1"
d123abc.cloudfront.net
```

Now in Amazon Route 53 you can map your custom domain to this CloudFront domain using either:

* CNAME
  or
* Alias Record

But in AWS, **Alias Record is recommended**.

---

## Why Alias is Preferred?

Because:

* supports root domain (`example.com`)
* optimized for AWS services
* no extra DNS lookup
* free query to AWS resources

---

## Example

### Using CNAME

```txt id="2"
www.example.com → d123abc.cloudfront.net
```

Works fine.

But:

```txt id="3"
example.com → d123abc.cloudfront.net
```

❌ Not allowed with CNAME.

---

## Using Alias Record

```txt id="4"
example.com → CloudFront Distribution
```

✅ Recommended by AWS.

---

## Real Production Practice

| Domain            | Record Type    |
| ----------------- | -------------- |
| `example.com`     | Alias          |
| `www.example.com` | Alias or CNAME |

Most companies use Alias with Route 53 + CloudFront.
