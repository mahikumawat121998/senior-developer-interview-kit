Here’s a complete URL example and explanation of every part.

---

# Full URL Example

```text id="k4vlt6"
https://api.bankexample.com:443/v1/users/profile?id=101&active=true#security
```

Now break it down piece by piece.

---

# URL Structure

```text id="0ojhh2"
protocol://subdomain.domain.tld:port/path?query#fragment
```

---

# 1. Protocol (Scheme)

```text id="2h3dhn"
https
```

Full part:

```text id="kwrlrr"
https://
```

Defines how browser communicates with server.

Common protocols:

| Protocol | Purpose                  |
| -------- | ------------------------ |
| HTTP     | Normal web traffic       |
| HTTPS    | Secure encrypted traffic |
| FTP      | File transfer            |
| WS       | WebSocket                |
| WSS      | Secure WebSocket         |

---

# HTTPS Importance

HTTPS uses:

* TLS/SSL encryption
* Secure communication
* Certificate validation

Essential for:

* Banking
* Login systems
* Payments

---

# 2. Subdomain

```text id="j0krm9"
api
```

From:

```text id="p3v54d"
api.bankexample.com
```

Subdomains organize services.

Examples:

| Subdomain         | Usage        |
| ----------------- | ------------ |
| api.example.com   | Backend APIs |
| admin.example.com | Admin panel  |
| mail.example.com  | Mail server  |
| app.example.com   | Frontend app |

---

# 3. Domain Name

```text id="q4ux7r"
bankexample
```

Main website/business identity.

---

# 4. TLD (Top Level Domain)

```text id="8g5t3w"
.com
```

Common TLDs:

| TLD  | Meaning        |
| ---- | -------------- |
| .com | Commercial     |
| .org | Organization   |
| .edu | Education      |
| .gov | Government     |
| .in  | India          |
| .uk  | United Kingdom |

---

# 5. Port

```text id="4s1zwm"
:443
```

Defines which server process receives request.

Common ports:

| Port  | Service    |
| ----- | ---------- |
| 80    | HTTP       |
| 443   | HTTPS      |
| 22    | SSH        |
| 5432  | PostgreSQL |
| 6379  | Redis      |
| 27017 | MongoDB    |

---

# Why Port Often Hidden

Browser automatically assumes:

```text id="h1e3hm"
HTTP  → 80
HTTPS → 443
```

So usually omitted.

---

# 6. Path

```text id="wyi8fq"
/v1/users/profile
```

Represents resource location.

Example REST API:

```text id="u48y5t"
/users
/products
/orders
```

---

# API Versioning

```text id="xk0b1u"
/v1/
```

Used for:

* Backward compatibility
* API evolution

Example:

```text id="fpx4lw"
/v1/users
/v2/users
```

---

# 7. Query Parameters

```text id="nq0h63"
?id=101&active=true
```

Used to send optional data.

Format:

```text id="w8u1r0"
?key=value&key=value
```

---

## Query Parameter Breakdown

### First parameter

```text id="1w8lu3"
id=101
```

### Second parameter

```text id="dph6fg"
active=true
```

---

# Use Cases

* Filtering
* Pagination
* Sorting
* Searching

Example:

```text id="1vvhiv"
/products?page=2&limit=10&sort=price
```

---

# 8. Fragment / Hash

```text id="m9cth0"
#security
```

Used for:

* Page section navigation
* Frontend routing

Browser scrolls to:

```html id="c4q70q"
<div id="security">
```

---

# URL Encoding

URLs cannot contain spaces directly.

Space becomes:

```text id="w60vwv"
%20
```

Example:

```text id="o4kg1s"
Mahesh Kumar
```

becomes:

```text id="4k5fzi"
Mahesh%20Kumar
```

---

# Special URL Characters

| Character | Meaning               |
| --------- | --------------------- |
| ?         | Start query params    |
| &         | Separate query params |
| =         | Assign value          |
| #         | Fragment              |
| /         | Path separator        |
| :         | Port separator        |

---

# Real Banking API URL Example

```text id="ql14gp"
https://api.mybank.com/v1/accounts/transfer?currency=INR
```

Breakdown:

| Part               | Meaning         |
| ------------------ | --------------- |
| https              | Secure protocol |
| api                | API subdomain   |
| mybank             | Domain          |
| .com               | TLD             |
| /v1                | API version     |
| /accounts/transfer | Endpoint        |
| currency=INR       | Query parameter |

---

# URL vs URI vs URN

People confuse these a lot.

---

# URI (Uniform Resource Identifier)

Generic identifier.

Includes:

* URL
* URN

---

# URL (Uniform Resource Locator)

Specifies:

* Location
* Access method

Example:

```text id="u4ybwq"
https://google.com
```

---

# URN (Uniform Resource Name)

Only identifies resource name.

Example:

```text id="smmh8x"
urn:isbn:0451450523
```

---

# DNS Resolution Process

When browser hits:

```text id="qtxgg7"
https://google.com
```

Flow:

```text id="aq7t2r"
URL
 ↓
DNS lookup
 ↓
IP address
 ↓
TCP connection
 ↓
TLS handshake
 ↓
HTTP request
```

---

# URL in Backend Systems

Important for:

* API routing
* Load balancers
* Reverse proxies
* CDN
* Authentication
* Microservices

---

# Reverse Proxy Example

```text id="u6ah4x"
Client
 ↓
Nginx
 ↓
Node.js App
```

Nginx routes based on URL path.

Example:

```text id="hf6l9n"
/api → Backend
/static → CDN
```

---

# Security Considerations

Never place sensitive data in URL:

❌ Bad:

```text id="i8f41s"
/login?password=123456
```

Because URLs:

* Appear in browser history
* Stored in logs
* Cached

Use request body instead.

---

# URL Length Limit

Browsers and servers have limits.

Typically:

```text id="85u50u"
~2000 characters
```

Avoid extremely large query params.

---

# RESTful URL Best Practices

Good:

```text id="x3x0eb"
/users/101/orders
```

Bad:

```text id="ks0sfr"
/getUserOrders?id=101
```

---

# Interview-Level Concepts

Important topics related to URLs:

* DNS resolution
* HTTPS/TLS
* Query params vs path params
* RESTful routing
* URL encoding
* Reverse proxy routing
* CDN behavior
* Signed URLs
* Presigned S3 URLs
* URL rewriting

These are commonly asked in backend/system design interviews.
