const statusCode = {{ user.status.value | tojson }};
const statuses = {
  active: "فعال",
  on_hold: "در انتظار اتصال",
  expired: "منقضی",
  limited: "اتمام حجم",
  disabled: "غیرفعال",
};

// Preserve the panel's path prefix and token, including reverse-proxy mounts.
const subscriptionUrl = new URL(window.location.href);
subscriptionUrl.hash = "";
subscriptionUrl.search = "";
const base = subscriptionUrl.href.replace(/\/$/, "");

const subscription = {
  id: {{ user.username | tojson }},
  status: statuses[statusCode] ?? "نامشخص",
  usedGB: {{ user.used_traffic | int }} / 1024 ** 3,
  totalGB: {{ user.data_limit | default(0, true) | int }} / 1024 ** 3,
  remainingDays: statusCode === "on_hold"
    ? {{ ((user.on_hold_expire_duration or 0) / 86400) | round(0, "ceil") | int }} || null
    : daysLeft({{ user.expire.timestamp() | int if user.expire else 0 }}),
  links: {
    subscription: subscriptionUrl.href,
    mihomo: base + "/clash_meta",
    json: base + "/xray",
  },
  configs: {{ links | tojson }},
  supportUrl: "",
};
