# MiHydroSense Middleware

Real-time MQTT ingestion, validation, deduplication, and Supabase persistence layer for the MiHydroSense multi-tenant hydroponic monitoring platform.

---

## Overview

MiHydroSense is an IoT-driven AgriTech platform designed to monitor hydroponic farms in real time.

This middleware service is responsible for:

- Subscribing to MQTT telemetry topics
- Validating incoming sensor payloads
- Deduplicating messages using device sequence IDs
- Enriching telemetry with server timestamps
- Persisting structured data to Supabase (Postgres)
- Generating alert events based on threshold rules

---

## Architecture Flow

Sensors (pH, EC, Temperature)  
→ WiFi MQTT Data Logger  
→ MQTT Broker (EMQX)  
→ Middleware (This Repository)  
→ Supabase Database  
→ WeWeb Dashboard

---

## Key Features

- Wildcard topic subscription (`mihydrosense/v1/+/+/telemetry`)
- JSON schema validation
- Multi-tenant farm isolation
- Sequence-based deduplication (`device_id + seq`)
- Threshold-based alert generation
- Designed to scale to 100+ farms (144,000+ readings/day baseline)

---

## Tech Stack

- Node.js (or Python)
- MQTT Client
- Supabase (Postgres)
- TLS-secured broker communication

---

## Scalability Considerations

- Stateless ingestion layer
- Horizontal scaling supported
- Backpressure handling with retry logic
- Designed for burst replay after connectivity loss

---
---

## System Architecture Overview

MiHydroSense Middleware acts as the real-time ingestion layer between distributed hydroponic sensor networks and the cloud analytics platform.

### Data Flow

1. Hydroponic sensors (pH, EC, temperature) transmit telemetry via WiFi.
2. Data Logger publishes MQTT messages to EMQX broker.
3. Middleware subscribes to multi-tenant telemetry topics.
4. Payloads are validated and range-checked.
5. Sequence-based deduplication prevents replay duplication.
6. Cleaned data is persisted to Supabase (Postgres).
7. WeWeb dashboard consumes structured telemetry for real-time monitoring.

### Design Principles

- Stateless ingestion layer
- Multi-tenant topic isolation
- Idempotent message processing
- Defensive validation
- Cloud-native deployment (Docker-ready)
- Designed for climate-resilient agriculture in the UK and emerging markets

---

## Deployment Model

The service can be deployed:

- As a containerized service (Docker)
- On UK cloud infrastructure (AWS, Azure, GCP)
- Behind secure TLS-enabled MQTT brokers
- With horizontal scaling support

---

## Vision

MiHydroSense is building a climate-resilient precision hydroponic intelligence platform, enabling:

- Water efficiency optimisation
- Nutrient balance stability
- Early anomaly detection
- Scalable multi-farm monitoring

This middleware forms the backbone of the real-time data intelligence layer.

## 📊 Status

✔ Live MQTT ingestion pipeline deployed  
✔ Processing real-time hydroponic sensor data  
✔ Integrated with Supabase cloud database  
✔ Connected to live dashboard (WeWeb)

Currently running pilot data simulations with planned deployment to live farms.

---
## 📡 Live Data Pipeline

The system currently processes real-time telemetry data including:

- pH levels
- Electrical Conductivity (EC)
- Temperature readings

Data is ingested via MQTT and stored in Supabase with timestamps for real-time monitoring.

Sample ingestion frequency: ~5-minute intervals

---

## 🚀 Technical Impact

- Designed a scalable IoT ingestion system capable of supporting 100+ hydroponic farms
- Processes continuous real-time environmental data for decision-making
- Enables early detection of nutrient imbalance and system failures
- Reduces operational risk through automated monitoring

This system contributes to improving efficiency and sustainability in controlled-environment agriculture, particularly relevant to UK food production challenges.

---

## 👨‍💻 Founder & Technical Leadership

I designed and implemented the full MiHydroSense architecture, including:

- IoT data pipeline (ESP32 → MQTT → Cloud)
- Middleware ingestion engine
- Database architecture (Supabase)
- Real-time monitoring system

This demonstrates end-to-end ownership of a production-level digital technology platform.

---

## 📸 Evidence

See /evidence folder for:

- Real-time dashboard screenshots
- Sensor data logs
- System architecture diagrams
