const expiry = {{ .expire }};
const totalBytes = {{ .totalByte }};
const usedBytes = {{ .uploadByte }} + {{ .downloadByte }};
const enabled = {{ .enabled }};
const remainingDays = daysLeft(expiry);
let status = enabled ? "فعال" : "غیرفعال";
if (remainingDays === 0) status = "منقضی";
else if (totalBytes > 0 && usedBytes >= totalBytes) status = "اتمام حجم";

const subscription = {
  id: {{ .sId }},
  status,
  usedGB: usedBytes / 1024 ** 3,
  totalGB: Math.max(0, totalBytes) / 1024 ** 3,
  remainingDays,
  links: {
    subscription: {{ .subUrl }},
    mihomo: {{ .subClashUrl }},
    json: {{ .subJsonUrl }},
  },
  configs: {{ .links }} ?? [],
  supportUrl: {{ .subSupportUrl }},
};
