import crypto from "crypto";

const token = crypto.randomBytes(24).toString("base64url");
const rawKey = `mb_live_${token}`;
const keyHash = crypto.createHash("sha256").update(rawKey).digest("hex");

console.log(JSON.stringify({ rawKey, keyPrefix: rawKey.slice(0, 14), keyHash }, null, 2));
