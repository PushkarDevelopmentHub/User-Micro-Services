# 🚖 UBER Clone – Scalable Microservices Backend  
### Node.js • RabbitMQ • MongoDB • JWT

A production-style backend system inspired by Uber’s architecture.  
This project demonstrates how to design and build a scalable, event-driven microservices backend using Node.js, RabbitMQ, and MongoDB — complete with real ride-request, captain assignment, and ride-acceptance flows.

---

## 📌 Table of Contents
- [Overview](#overview)  
- [Architecture](#architecture)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Services Breakdown](#services-breakdown)  
- [Ride Workflow](#ride-workflow)  
- [What-You-Will-Learn](#what-you-will-learn)  
- [Project Description](#project-description)  

---

# 📝 Overview

This backend simulates how a real ride-hailing platform (like Uber/Lyft/Ola) works behind the scenes.  
The system is split into separate **microservices**, each responsible for a single domain:

- **User Service**  
- **Captain Service**  
- **Ride Service**  
- **API Gateway**

Communication between services happens through **RabbitMQ message queues**, allowing the system to scale easily and handle real-time ride events.

JWT is used for secure authentication, and each microservice has its own **MongoDB database**.

---

# 🏗️ Architecture

                   ┌──────────────────┐
                   │    API Gateway   │
                   └──────────────────┘
                           │
           ┌───────────────┼────────────────┐
           │               │                │
 ┌────────────────┐ ┌───────────────┐ ┌────────────────┐
 │  User Service  │ │ Ride Service  │ │ Captain Service│
 └────────────────┘ └───────────────┘ └────────────────┘
           │               │                │
           └───────────────┬────────────────┘
                           ▼
                  ┌──────────────────┐
                  │     RabbitMQ     │
                  │ (Event Broker)   │
                  └──────────────────┘


### 🔐 Authentication  
- JWT-based login for Users and Captains  
- Secure routing through API Gateway  

### 🛺 Real Ride System  
- User sends a ride request  
- Ride Service assigns available captains  
- Captain receives request  
- Captain accepts the ride  
- User gets ride confirmation  

### 📬 Event-Driven Architecture  
- RabbitMQ used for ride events:  
  - `ride.requested`  
  - `ride.accepted`  
- Decoupled & scalable service communication  

### 🗄 Database Split  
- Each service has **its own MongoDB**  
- No shared database  
- Loose coupling and independent scaling  

---

# 🧰 Tech Stack

| Category | Technologies |
|---------|--------------|
| **Backend** | Node.js, Express.js |
| **Communication** | RabbitMQ (message queues), REST APIs |
| **Database** | MongoDB (independent DB per service) |
| **Security** | JWT Authentication |
| **Architecture** | Microservices, API Gateway, Event-Driven |

---

# 📦 Services Breakdown

### 1️⃣ **User Service**
- Register / login users  
- Manage profiles  
- View ride history  

### 2️⃣ **Captain Service**
- Register / login captains  
- Set availability  
- Receive and accept rides  

### 3️⃣ **Ride Service**
- Create new ride requests  
- Find available captains  
- Update ride status  
- Publish & consume ride-related events  

### 4️⃣ **API Gateway**
- Single entry point for frontend  
- Validates JWT  
- Routes requests to correct microservice  

---

# 🔄 Ride Workflow

### 1. **User sends ride request**  
→ Gateway routes request to **Ride Service**

### 2. **Ride Service creates ride**  
→ Publishes a `ride.requested` event to RabbitMQ

### 3. **Captain Service consumes the event**  
→ Finds an available captain  
→ Sends ride request notification  

### 4. **Captain accepts the ride**  
→ Captain Service publishes the `ride.accepted` event  
→ Ride Service updates ride status  

### 5. **User receives confirmation**  
→ API Gateway returns updated ride details  

---

# 🎓 What You Will Learn

- How to structure modern **microservices**  
- How to use **RabbitMQ** for async event communication  
- How API Gateways route and secure traffic  
- How ride-matching logic works internally  
- How to split databases correctly in microservices  
- How distributed systems maintain data consistency  

---

# 📄 Project Description

A scalable, event-driven microservices backend built with Node.js, RabbitMQ, MongoDB, and JWT.  
This UBER Clone demonstrates how user authentication, captain management, ride creation, and ride assignment work in a real ride-hailing system.

The backend includes four microservices — User, Captain, Ride, and API Gateway — communicating through REST APIs and RabbitMQ message queues.

When a user requests a ride, the Ride Service publishes an event, the Captain Service receives it, and the captain can accept the ride. The system then updates the ride status and returns the result to the user.  

Designed to help developers understand **real-world backend system design, event-driven architecture, and scalable microservice patterns**.

