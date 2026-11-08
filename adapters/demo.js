const subscription = {
  id: "DEMO-2026-ABCD1234",
  status: "فعال",
  usedGB: 2.5,
  totalGB: 10,
  remainingDays: 30,
  links: {
    subscription: "https://example.invalid/sub/DEMO-2026-ABCD1234",
    mihomo: "https://example.invalid/sub/DEMO-2026-ABCD1234/mihomo",
    json: "https://example.invalid/sub/DEMO-2026-ABCD1234/json",
  },
  configs: [
    "vless://00000000-0000-4000-8000-000000000000@example.invalid:443?encryption=none&security=tls&type=tcp#Demo",
    "vmess://" + btoa(JSON.stringify({
      v: "2", ps: "Demo", add: "example.invalid", port: "443",
      id: "00000000-0000-4000-8000-000000000000", aid: "0", scy: "auto",
      net: "tcp", type: "none", tls: "tls",
    })),
    "trojan://demo-password@example.invalid:443?security=tls&type=tcp#Demo",
  ],
  supportUrl: "", // Set an HTTPS or mailto URL when support details are available.
};

