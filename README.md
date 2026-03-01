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

## Status

Initial scaffold created.  
Middleware ingestion pipeline implementation in progress.

---

## Author

Founder & Technical Architect — MiHydroSense  
Climate-resilient precision hydroponic intelligence for modern agriculture.
