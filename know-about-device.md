You can detect and track which type of device a user is using during authentication/login using:

* User-Agent
* IP Address
* Device Fingerprinting
* Browser Info
* OS Info

This is commonly used in:

* Refresh token management
* Multi-device login
* Session tracking
* Security alerts
* Suspicious login detection

---

# 1. What Information Can We Detect?

Typical device/session info:

| Field       | Example               |
| ----------- | --------------------- |
| Device Type | Mobile/Desktop/Tablet |
| Browser     | Chrome                |
| OS          | Windows/Android/iOS   |
| IP Address  | 49.x.x.x              |
| Location    | Jaipur, India         |
| Device Name | Windows Chrome        |
| Login Time  | Timestamp             |

---

# 2. Where Is This Used?

Professional systems use it for:

```txt
- Session management
- Refresh token storage
- "Logged in devices" page
- Logout from specific device
- Suspicious activity detection
```

Example:

```txt
Your account was logged in from:
Chrome on Windows - Jaipur
```

---

# 3. Main Technique → User-Agent

Every request contains:

```txt
User-Agent header
```

Example:

```txt
Mozilla/5.0 (Windows NT 10.0; Win64; x64)
AppleWebKit/537.36 Chrome/136.0.0.0
```

From this we can detect:

* Browser
* OS
* Device type

---

# 4. Node.js Implementation

Install package:

```bash
npm install ua-parser-js
```

---

# 5. Parse Device Info

Example:

```js
const UAParser = require("ua-parser-js");

app.post("/login", (req, res) => {

  const parser = new UAParser(req.headers["user-agent"]);

  const result = parser.getResult();

  console.log(result);

  res.json(result);
});
```

---

# 6. Example Output

```json
{
  "browser": {
    "name": "Chrome",
    "version": "136.0.0"
  },
  "os": {
    "name": "Windows",
    "version": "10"
  },
  "device": {
    "type": "desktop"
  }
}
```

---

# 7. Detect IP Address

Example:

```js
const ip =
  req.headers["x-forwarded-for"] ||
  req.socket.remoteAddress;
```

---

# 8. Why x-forwarded-for?

Because in production:

```txt
Client -> Load Balancer -> Server
```

The real IP comes from proxy headers.

---

# 9. Store Device Info with Refresh Token

Very important.

Example schema:

```txt
refresh_tokens
----------------
id
user_id
token
device_type
browser
os
ip_address
location
is_revoked
created_at
```

---

# 10. Login Flow with Device Tracking

```txt
User logs in
    ↓
Generate refresh token
    ↓
Extract device info
    ↓
Store device session in DB
```

---

# 11. Example Full Login Flow

```js
const UAParser = require("ua-parser-js");

app.post("/login", async (req, res) => {

  const parser = new UAParser(req.headers["user-agent"]);

  const deviceInfo = parser.getResult();

  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress;

  const refreshToken = generateRefreshToken();

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      browser: deviceInfo.browser.name,
      os: deviceInfo.os.name,
      deviceType: deviceInfo.device.type || "desktop",
      ipAddress: ip
    }
  });

  res.json({
    accessToken
  });
});
```

---

# 12. Show Logged-in Devices

Like Google.

API:

```txt
GET /my-devices
```

Response:

```json
[
  {
    "browser": "Chrome",
    "os": "Windows",
    "deviceType": "desktop",
    "ip": "49.xx.xx",
    "lastActive": "2026-05-08"
  }
]
```

---

# 13. Logout Specific Device

Example:

```txt
DELETE /session/:sessionId
```

Then:

```txt
- revoke refresh token
- remove device session
```

---

# 14. Detect Mobile/Desktop

Simple example:

```js
const isMobile =
  /mobile/i.test(req.headers["user-agent"]);
```

But professional apps use:

* ua-parser-js
* device-detector-js

---

# 15. Device Fingerprinting (Advanced)

Used by:

* Banking apps
* Google
* Enterprise systems

Collects:

* screen size
* fonts
* timezone
* browser plugins
* canvas fingerprint

Purpose:

* uniquely identify device

Popular library:

```txt
FingerprintJS
```

---

# 16. Security Benefits

---

## Detect Suspicious Login

Example:

```txt
User normally logs in from India
Suddenly login from Russia
```

Trigger:

* MFA
* email alert

---

## Detect Token Theft

If same refresh token used from:

* different IP
* different device

Then:

* revoke session

---

# 17. Geo Location Detection

Using IP geolocation services.

Can detect:

```txt
City
Country
Region
ISP
```

Popular services:

* MaxMind
* IPInfo

---

# 18. Enterprise-Level Session System

Professional systems store:

```txt
sessions
---------
id
user_id
refresh_token_hash
device_name
browser
os
ip_address
country
city
last_active
expires_at
is_revoked
```

---

# 19. Refresh Token Per Device

Best practice:

```txt
1 refresh token = 1 device session
```

So user can:

* logout from laptop only
* keep phone logged in

---

# 20. Recommended Architecture for Your System

For your multi-tenant microservice system:

## Auth Service

Handles:

* login
* refresh tokens
* device tracking

## Session Table

```txt
user_sessions
--------------
id
user_id
cluster_id
refresh_token_hash
device_type
browser
os
ip_address
last_active
expires_at
```

---

# 21. Important Security Best Practices

---

## Never Trust User-Agent Fully

Because:

* it can be spoofed

Use it only for:

* convenience
* tracking

Not as primary security.

---

## Hash Refresh Tokens

Never store raw refresh tokens.

Use:

```js
bcrypt.hash(token)
```

---

## Update last_active

On every refresh request:

```txt
last_active = current time
```

---

# 22. Real Production Flow

```txt
Login
  ↓
Detect device/browser/IP
  ↓
Create session
  ↓
Store refresh token
  ↓
Attach session to device
  ↓
User can manage devices later
```

---

# 23. Common Interview Questions

---

## How does Google show logged-in devices?

By storing:

* refresh tokens
* session metadata
* device information

---

## Can User-Agent be trusted?

No.
It can be modified/spoofed.

---

## Why track devices?

* Better security
* Session management
* Detect suspicious logins

---

## How to logout from all devices?

```txt
Delete all refresh tokens
for user
```

---

## How to logout from one device?

```txt
Delete one refresh token/session
```
