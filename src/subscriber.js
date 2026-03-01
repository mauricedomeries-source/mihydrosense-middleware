import mqtt from "mqtt";
import { createClient } from "@supabase/supabase-js";

// Environment variables
const brokerUrl = process.env.MQTT_BROKER_URL;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!brokerUrl || !supabaseUrl || !supabaseKey) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

// Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// MQTT connection
const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe("mihydrosense/v1/+/+/telemetry", { qos: 1 });
});

client.on("message", async (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());

    const { farm_id, device_id, seq, ph, ec_uS_cm, temp_c } = payload;

    if (!farm_id || !device_id || seq === undefined) {
      console.warn("Invalid payload structure:", payload);
      return;
    }

// Deduplication check
const { data: existing } = await supabase
  .from("readings")
  .select("id")
  .eq("device_id", device_id)
  .eq("seq", seq)
  .limit(1);

if (existing && existing.length > 0) {
  console.log(`Duplicate message ignored → ${device_id} (#${seq})`);
  return;
}

// Insert new telemetry
const { error } = await supabase.from("readings").insert([
  {
    farm_id,
    device_id,
    seq,
    ph,
    ec_uS_cm,
    temp_c,
    server_received_at: new Date().toISOString(),
  },
]);

    if (error) {
      console.error("Database insert error:", error.message);
    } else {
      console.log(`Telemetry stored → ${device_id} (#${seq})`);
    }
  } catch (err) {
    console.error("Message processing error:", err.message);
  }
});
