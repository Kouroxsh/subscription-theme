const translations = {
  "fa": {
    "subscription": "اشتراک",
    "heading": "اشتراک من",
    "usagePercent": "درصد مصرف",
    "percentSign": "٪",
    "used": "مصرف‌شده",
    "outOf": "از",
    "links": "لینک‌های اشتراک",
    "subscriptionLink": "کپی لینک اشتراک",
    "mihomoLink": "کپی لینک کلش / Mihomo",
    "jsonLink": "کپی لینک JSON",
    "remainingVolume": "حجم باقی‌مانده",
    "remainingDays": "روزهای باقی‌مانده",
    "configs": "کانفیگ‌ها",
    "config": "کانفیگ",
    "copy": "کپی",
    "help": "به راهنمایی نیاز دارید؟",
    "support": "تماس با پشتیبانی",
    "manualCopy": "کپی دستی",
    "selectText": "متن را انتخاب و کپی کنید.",
    "close": "بستن",
    "headerLabel": "سربرگ اشتراک",
    "usageLabel": "حجم و زمان باقی‌مانده",
    "language": "زبان",
    "unlimited": "نامحدود",
    "active": "فعال",
    "disabled": "غیرفعال",
    "expired": "منقضی",
    "limited": "اتمام حجم",
    "on_hold": "در انتظار اتصال",
    "unknown": "نامشخص",
    "copied": "کپی شد",
    "linkCopied": "لینک کپی شد.",
    "configCopied": "کانفیگ کپی شد.",
    "nothingToCopy": "مقداری برای کپی در دسترس نیست.",
    "copyConfig": "کپی کانفیگ {name}"
  },
  "en": {
    "subscription": "Subscription",
    "heading": "My subscription",
    "usagePercent": "Data usage",
    "percentSign": "%",
    "used": "Used",
    "outOf": "of",
    "links": "Subscription links",
    "subscriptionLink": "Copy subscription link",
    "mihomoLink": "Copy Clash / Mihomo link",
    "jsonLink": "Copy JSON link",
    "remainingVolume": "Remaining data",
    "remainingDays": "Days remaining",
    "configs": "Configurations",
    "config": "Config",
    "copy": "Copy",
    "help": "Need help?",
    "support": "Contact support",
    "manualCopy": "Copy manually",
    "selectText": "Select and copy the text.",
    "close": "Close",
    "headerLabel": "Subscription header",
    "usageLabel": "Remaining data and time",
    "language": "Language",
    "unlimited": "Unlimited",
    "active": "Active",
    "disabled": "Disabled",
    "expired": "Expired",
    "limited": "Data limit reached",
    "on_hold": "Awaiting connection",
    "unknown": "Unknown",
    "copied": "Copied",
    "linkCopied": "Link copied.",
    "configCopied": "Config copied.",
    "nothingToCopy": "Nothing to copy.",
    "copyConfig": "Copy config {name}"
  },
  "ru": {
    "subscription": "Подписка",
    "heading": "Моя подписка",
    "usagePercent": "Использование трафика",
    "percentSign": "%",
    "used": "Использовано",
    "outOf": "из",
    "links": "Ссылки подписки",
    "subscriptionLink": "Копировать ссылку подписки",
    "mihomoLink": "Копировать ссылку Clash / Mihomo",
    "jsonLink": "Копировать ссылку JSON",
    "remainingVolume": "Остаток трафика",
    "remainingDays": "Осталось дней",
    "configs": "Конфигурации",
    "config": "Конфигурация",
    "copy": "Копировать",
    "help": "Нужна помощь?",
    "support": "Связаться с поддержкой",
    "manualCopy": "Копирование вручную",
    "selectText": "Выделите и скопируйте текст.",
    "close": "Закрыть",
    "headerLabel": "Заголовок подписки",
    "usageLabel": "Остаток трафика и времени",
    "language": "Язык",
    "unlimited": "Без ограничений",
    "active": "Активна",
    "disabled": "Отключена",
    "expired": "Истекла",
    "limited": "Трафик исчерпан",
    "on_hold": "Ожидает подключения",
    "unknown": "Неизвестно",
    "copied": "Скопировано",
    "linkCopied": "Ссылка скопирована.",
    "configCopied": "Конфигурация скопирована.",
    "nothingToCopy": "Нечего копировать.",
    "copyConfig": "Копировать конфигурацию {name}"
  },
  "zh": {
    "subscription": "订阅",
    "heading": "我的订阅",
    "usagePercent": "流量使用率",
    "percentSign": "%",
    "used": "已用",
    "outOf": "共",
    "links": "订阅链接",
    "subscriptionLink": "复制订阅链接",
    "mihomoLink": "复制 Clash / Mihomo 链接",
    "jsonLink": "复制 JSON 链接",
    "remainingVolume": "剩余流量",
    "remainingDays": "剩余天数",
    "configs": "配置",
    "config": "配置",
    "copy": "复制",
    "help": "需要帮助？",
    "support": "联系支持",
    "manualCopy": "手动复制",
    "selectText": "请选择并复制文本。",
    "close": "关闭",
    "headerLabel": "订阅页眉",
    "usageLabel": "剩余流量和时间",
    "language": "语言",
    "unlimited": "不限",
    "active": "有效",
    "disabled": "已停用",
    "expired": "已过期",
    "limited": "流量已用完",
    "on_hold": "等待连接",
    "unknown": "未知",
    "copied": "已复制",
    "linkCopied": "链接已复制。",
    "configCopied": "配置已复制。",
    "nothingToCopy": "没有可复制的内容。",
    "copyConfig": "复制配置 {name}"
  }
};


const toast = document.querySelector("#toast");
const copyDialog = document.querySelector("#copy-dialog");
const copyValue = document.querySelector("#copy-value");
const feedbackTimers = new WeakMap();
let toastTimer;
let toastKey;
let messages;

const languageSelect = document.querySelector("#language-select");
const languageStorageKey = "subscription-theme-language";

function savedLanguage() {
  try {
    return localStorage.getItem(languageStorageKey);
  } catch {
    return null;
  }
}

function applyLanguage(language) {
  if (!Object.hasOwn(translations, language)) language = "fa";
  messages = translations[language];
  const locale = language === "zh" ? "zh-Hans" : language;
  document.documentElement.lang = locale;
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  languageSelect.value = language;

  for (const element of document.querySelectorAll("[data-i18n]")) {
    element.textContent = messages[element.closest('[data-copied="true"]') ? "copied" : element.dataset.i18n];
  }
  for (const element of document.querySelectorAll("[data-i18n-label]")) {
    element.setAttribute("aria-label", messages[element.dataset.i18nLabel]);
  }

  const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
  for (const row of configList.children) {
    const { protocol, count } = row.dataset;
    const label = count === "1" ? protocol : protocol + " " + number.format(count);
    row.querySelector("bdi").textContent = label;
    row.querySelector("button").setAttribute("aria-label", messages.copyConfig.replace("{name}", label));
  }

  if (toastKey) toast.textContent = messages[toastKey];
  renderSubscription(subscription, locale, number);
}

function renderSubscription(data, locale, number) {
  const volume = new Intl.NumberFormat(locale, { style: "unit", unit: "gigabyte", maximumFractionDigits: 2 });
  const days = new Intl.NumberFormat(locale, { style: "unit", unit: "day", unitDisplay: "long" });
  const unlimited = data.totalGB === 0;
  const remaining = Math.max(0, data.totalGB - data.usedGB);
  const percent = data.totalGB > 0
    ? Math.min(100, Math.max(0, data.usedGB / data.totalGB * 100))
    : 0;
  const status = document.querySelector("#plan-status");
  const progress = document.querySelector(".progress-track");
  const gauge = document.querySelector(".gauge-fill");

  status.textContent = Object.hasOwn(messages, data.status) ? messages[data.status] : messages.unknown;
  status.dataset.active = String(data.status === "active");
  document.querySelector("#subscription-id").textContent = data.id;
  document.querySelector(".overview-body").hidden = unlimited;
  document.querySelector("#percentage-number").textContent = number.format(percent);
  document.querySelector("#used-volume").textContent = volume.format(data.usedGB);
  document.querySelector("#total-volume").textContent = unlimited ? messages.unlimited : volume.format(data.totalGB);
  document.querySelector("#remaining-volume").textContent = unlimited ? messages.unlimited : volume.format(remaining);
  document.querySelector("#remaining-days").textContent = data.remainingDays == null ? messages.unlimited : days.format(data.remainingDays);
  progress.hidden = unlimited;
  progress.setAttribute("aria-valuenow", String(percent));
  progress.style.setProperty("--progress", percent + "%");
  gauge.setAttribute("stroke-dasharray", percent + " 100");
  gauge.style.visibility = percent > 0 ? "visible" : "hidden";
}

function showToast(key) {
  clearTimeout(toastTimer);
  toastKey = key;
  toast.textContent = messages[key];
  toast.dataset.visible = "true";
  toastTimer = setTimeout(() => {
    toast.dataset.visible = "false";
    toast.textContent = "";
    toastKey = undefined;
  }, 2400);
}

function copyWithSelection(value) {
  const previouslyFocused = document.activeElement;
  const field = document.createElement("textarea");
  field.value = value;
  field.readOnly = true;
  field.style.cssText = "position:fixed;inset:0 auto auto 0;opacity:0;pointer-events:none";
  document.body.append(field);
  field.select();
  field.setSelectionRange(0, value.length);

  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    field.remove();
    previouslyFocused?.focus({ preventScroll: true });
  }
}

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return copyWithSelection(value);
  }
}

async function handleCopy(button, value, message) {
  if (!value) {
    showToast("nothingToCopy");
    return;
  }

  if (!await copyText(value)) {
    copyValue.value = value;
    if (!copyDialog.open) copyDialog.showModal();
    copyValue.select();
    return;
  }

  showToast(message);
  const icon = button.querySelector("use");
  const label = button.querySelector("[data-i18n]");
  clearTimeout(feedbackTimers.get(button));
  button.dataset.copied = "true";
  icon.setAttribute("href", "#check");
  label.textContent = messages.copied;

  feedbackTimers.set(button, setTimeout(() => {
    delete button.dataset.copied;
    icon.setAttribute("href", "#copy");
    label.textContent = messages[label.dataset.i18n];
    feedbackTimers.delete(button);
  }, 1800));
}

function daysLeft(timestamp) {
  return timestamp > 0 ? Math.max(0, Math.ceil((timestamp * 1000 - Date.now()) / 86400000)) : null;
}

function webUrl(value, protocols = ["https:", "http:"]) {
  if (!value) return "";
  try {
    const url = new URL(value, window.location.href);
    return protocols.includes(url.protocol) && !url.username && !url.password ? url.href : "";
  } catch {
    return "";
  }
}

const linkSection = document.querySelector(".link-section");
let hasLinks = false;
for (const button of linkSection.querySelectorAll("[data-link]")) {
  const value = webUrl(subscription.links[button.dataset.link]);
  if (!value) continue;
  hasLinks = true;
  button.hidden = false;
  button.addEventListener("click", () => handleCopy(button, value, "linkCopied"));
}
linkSection.hidden = !hasLinks;

const configList = document.querySelector(".config-list");
const configRow = document.querySelector("#config-row");
const counts = new Map();

for (const value of new Set(subscription.configs)) {
  const protocol = /^([a-z][a-z0-9+.-]*):\/\//i.exec(value)?.[1].toUpperCase();
  if (!protocol || ["HTTP", "HTTPS", "JAVASCRIPT", "DATA", "FILE"].includes(protocol)) continue;

  const count = (counts.get(protocol) ?? 0) + 1;
  counts.set(protocol, count);

  const row = configRow.content.cloneNode(true);
  row.firstElementChild.dataset.protocol = protocol;
  row.firstElementChild.dataset.count = count;
  const button = row.querySelector("button");
  button.addEventListener("click", () => handleCopy(button, value, "configCopied"));
  configList.append(row);
}

document.querySelector(".configs").hidden = !configList.childElementCount;

const supportUrl = webUrl(subscription.supportUrl, ["https:", "http:", "mailto:"]);
if (supportUrl) {
  document.querySelector(".site-footer").hidden = false;
  document.querySelector("#support-link").addEventListener("click", () => {
    window.location.assign(supportUrl);
  });
}


applyLanguage(savedLanguage());
languageSelect.addEventListener("change", () => {
  applyLanguage(languageSelect.value);
  try {
    localStorage.setItem(languageStorageKey, languageSelect.value);
  } catch {
    // The current page still updates if storage is unavailable.
  }
});
