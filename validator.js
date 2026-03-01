export function validatePayload(payload) {
  const { farm_id, device_id, seq, ph, ec_uS_cm, temp_c } = payload;

  if (!farm_id || !device_id || seq === undefined) {
    return
