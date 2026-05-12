## What is Nginx?

Nginx is a high-performance web server, reverse proxy server, load balancer, and API gateway.

It is widely used to:

* Serve frontend applications (React, Next.js, Angular)
* Route requests to backend services
* Handle SSL/HTTPS
* Load balance traffic
* Serve static files efficiently
* Act as a gateway in microservices

It is event-driven and asynchronous, so it can handle thousands of concurrent connections with low memory usage.

---

# Why We Use Nginx

## 1. Reverse Proxy

Most common use case.

Client → Nginx → Node.js/Express app

Instead of exposing your Node.js server directly to the internet, Nginx sits in front of it.

Example:

```nginx
server {
    listen 80;

    location / {
        proxy_pass http://localhost:3000;
    }
}
```

### Benefits

* Security
* Better performance
* Request routing
* Hide backend ports
* SSL termination

---

# 2. Load Balancing

Suppose you have multiple Node.js instances:

```text
Client
   |
 Nginx
 / | \
3001 3002 3003
```

Nginx distributes requests across servers.

Example:

```nginx
http {
    upstream backend_servers {
        server localhost:3001;
        server localhost:3002;
        server localhost:3003;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://backend_servers;
        }
    }
}
```

### Why?

* Prevent server overload
* High availability
* Better scalability

---

# 3. Serve Static Files Fast

Nginx is extremely fast for:

* Images
* CSS
* JS
* HTML
* PDFs

Instead of Node.js serving static files, Nginx handles them efficiently.

Example:

```nginx
location /static/ {
    root /var/www/app;
}
```

---

# 4. SSL/HTTPS Handling

Nginx manages SSL certificates.

Example:

```nginx
server {
    listen 443 ssl;

    ssl_certificate /etc/ssl/cert.pem;
    ssl_certificate_key /etc/ssl/key.pem;
}
```

This avoids SSL processing overhead in Node.js.

---

# 5. API Gateway in Microservices

In microservices architecture, Nginx routes traffic.

Example:

```nginx
location /auth {
    proxy_pass http://auth-service;
}

location /users {
    proxy_pass http://user-service;
}
```

This is useful for your microservices projects.

---

# 6. Caching

Nginx can cache responses:

* API responses
* Images
* Static assets

This improves speed and reduces backend load.

---

# How Request Flows

```text
Browser
   |
   v
Nginx (Port 80/443)
   |
   v
Node.js App (Port 3000)
```

Nginx handles:

* HTTPS
* Routing
* Load balancing
* Security

Node.js focuses on business logic.

---

# Nginx Folder Structure (Linux/Ubuntu)

Common structure:

```text
/etc/nginx
│
├── nginx.conf
├── sites-available
├── sites-enabled
├── conf.d
├── snippets
├── mime.types
├── proxy_params
└── logs
```

---

# Important Files & Folders

## 1. nginx.conf

Main configuration file.

Path:

```text
/etc/nginx/nginx.conf
```

Contains:

* Worker processes
* HTTP settings
* Includes site configs

Example:

```nginx
worker_processes auto;

http {
    include /etc/nginx/sites-enabled/*;
}
```

---

## 2. sites-available

Contains all site configurations.

Example:

```text
/etc/nginx/sites-available/myapp
```

---

## 3. sites-enabled

Active/enabled websites.

Usually symbolic links from `sites-available`.

Enable a site:

```bash
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
```

---

## 4. conf.d

Extra configuration files.

Example:

```text
/etc/nginx/conf.d/api.conf
```

Useful for:

* Microservices
* Shared configs
* Docker setups

---

## 5. logs

Logs directory.

```text
/var/log/nginx/
```

Important logs:

```text
access.log
error.log
```

Check errors:

```bash
tail -f /var/log/nginx/error.log
```

---

# Typical MERN + Nginx Deployment Structure

```text
/var/www/
│
├── frontend
│   ├── build
│
├── backend
│   ├── server.js
│   ├── node_modules
│
└── nginx
```

---

# Example Production Setup

Frontend:

```text
React Build → Served by Nginx
```

Backend:

```text
Node.js running on port 5000
```

Nginx:

```nginx
server {
    listen 80;

    location / {
        root /var/www/frontend/build;
        index index.html;
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
    }
}
```

---

# Nginx Alternatives

## 1. Apache HTTP Server

Old and popular web server.

### Pros

* Easy configuration
* Large ecosystem
* `.htaccess` support

### Cons

* Slower than Nginx for high concurrency
* More memory usage

---

## 2. HAProxy

Specialized load balancer.

### Best for

* High traffic systems
* TCP/HTTP balancing

### Used by

* Large enterprise systems

---

## 3. Traefik

Popular in Docker/Kubernetes.

### Features

* Auto service discovery
* Great for microservices
* Dynamic routing

---

## 4. Caddy

Modern alternative.

### Best feature

Automatic HTTPS using Let's Encrypt.

Example:

```text
example.com {
    reverse_proxy localhost:3000
}
```

Very beginner-friendly.

---

## 5. Envoy

Used in:

* Kubernetes
* Service mesh
* Istio

Advanced microservices environments.

---

# Which One Should You Use?

| Use Case                  | Best Choice      |
| ------------------------- | ---------------- |
| MERN deployment           | Nginx            |
| Simple beginner setup     | Caddy            |
| Enterprise load balancing | HAProxy          |
| Kubernetes/Microservices  | Traefik or Envoy |
| Traditional hosting       | Apache           |

---

# Interview Answer (Short Version)

> Nginx is a high-performance web server and reverse proxy server used for load balancing, SSL termination, caching, and serving static files. In Node.js applications, it is commonly used as a reverse proxy in front of Express servers to improve performance, security, and scalability. It also helps in routing traffic in microservices architectures.


# Difference Between Forward Proxy and Reverse Proxy

This is a very common interview question.

---

# Simple Understanding

## Forward Proxy

A **forward proxy** sits between:

* Client (user/browser)
* Internet

```text id="clggqg"
Client → Forward Proxy → Internet
```

The proxy represents the **client**.

---

## Reverse Proxy

A **reverse proxy** sits between:

* Internet
* Backend servers

```text id="o1ye4k"
Client → Reverse Proxy → Backend Server
```

The proxy represents the **server**.

---

# 1. Forward Proxy

A forward proxy hides the client identity from the internet.

---

## Real Example

Inside companies:

* Employees cannot directly access internet
* Requests go through a proxy server

```text id="uh6uhd"
Employee PC
    |
Forward Proxy
    |
Google/Youtube/etc
```

---

# Uses of Forward Proxy

## 1. Hide Client IP

Websites see proxy IP instead of real user IP.

---

## 2. Access Restricted Content

Example:

* VPN
* Geo-restricted websites

---

## 3. Content Filtering

Companies block:

* YouTube
* Social media
* adult websites

using forward proxies.

---

## 4. Caching

Frequently accessed sites are cached.

---

# Example Technologies

* Squid
* VPN servers
* Corporate proxies

---

# Forward Proxy Flow

```text id="8zod5l"
User Browser
     |
Forward Proxy
     |
Internet
```

Internet thinks:

```text id="rfm3qd"
Request came from proxy
```

---

# 2. Reverse Proxy

A reverse proxy hides backend servers from clients.

This is what Nginx usually does.

---

# Reverse Proxy Flow

```text id="fsk9kg"
Client
   |
Reverse Proxy (Nginx)
   |
Backend Servers
```

Users never directly access backend servers.

---

# Uses of Reverse Proxy

## 1. Load Balancing

Distribute requests:

```text id="h27ylm"
5000
5001
5002
```

---

## 2. SSL Termination

HTTPS handled by proxy.

---

## 3. Security

Hide backend servers.

---

## 4. Caching

Cache API/static responses.

---

## 5. API Gateway

Microservices routing:

```text id="4chp7n"
/auth → auth-service
/users → user-service
```

---

# Real Example in Your Setup

```text id="7bpr0p"
Browser
   |
Nginx
   |
Node.js App
```

Nginx is reverse proxy.

---

# Main Difference

| Feature          | Forward Proxy           | Reverse Proxy            |
| ---------------- | ----------------------- | ------------------------ |
| Represents       | Client                  | Server                   |
| Sits In Front Of | Clients                 | Servers                  |
| Purpose          | Hide users              | Hide backend servers     |
| Used By          | Users/Companies         | Websites/Applications    |
| Example          | VPN, Squid              | Nginx                    |
| Internet Sees    | Proxy IP                | Proxy server             |
| Common Use       | Internet access control | Load balancing & routing |

---

# Easy Real-Life Analogy

# Forward Proxy

Like a travel agent booking tickets for you.

Airline does not directly deal with you.

---

# Reverse Proxy

Like a hotel receptionist.

Customers talk to receptionist, not directly to hotel staff.

---

# Interview Answer

> A forward proxy sits between clients and the internet, representing the client and hiding client identity. It is commonly used for VPNs, content filtering, and internet access control.
>
> A reverse proxy sits between clients and backend servers, representing the server. It is commonly used for load balancing, SSL termination, caching, API routing, and security. Nginx is a popular reverse proxy server.
