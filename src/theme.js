const persianNumber = new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 1 });
const englishNumber = new Intl.NumberFormat("en", { maximumFractionDigits: 2 });
const toast = document.querySelector("#toast");
const copyDialog = document.querySelector("#copy-dialog");
const copyValue = document.querySelector("#copy-value");
const feedbackTimers = new WeakMap();
let toastTimer;

function renderSubscription(data) {
  const unlimited = data.totalGB === 0;
  const remaining = Math.max(0, data.totalGB - data.usedGB);
  const percent = data.totalGB > 0
    ? Math.min(100, Math.max(0, data.usedGB / data.totalGB * 100))
    : 0;
  const status = document.querySelector("#plan-status");
  const progress = document.querySelector(".progress-track");
  const gauge = document.querySelector(".gauge-fill");

  status.textContent = data.status;
  status.dataset.active = String(data.status === "فعال");
  document.querySelector("#subscription-id").textContent = data.id;
  document.querySelector("#percentage-number").textContent = unlimited ? "—" : persianNumber.format(percent);
  document.querySelector("#used-volume").textContent = englishNumber.format(data.usedGB) + " GB";
  document.querySelector("#total-volume").textContent = unlimited ? "نامحدود" : englishNumber.format(data.totalGB) + " GB";
  document.querySelector("#remaining-volume").textContent = unlimited ? "نامحدود" : englishNumber.format(remaining) + " GB";
  document.querySelector("#remaining-days").textContent = data.remainingDays == null ? "نامحدود" : persianNumber.format(data.remainingDays) + " روز";
  progress.hidden = unlimited;
  progress.setAttribute("aria-valuenow", String(percent));
  progress.style.setProperty("--progress", percent + "%");
  gauge.setAttribute("stroke-dasharray", percent + " 100");
  gauge.style.visibility = percent > 0 ? "visible" : "hidden";
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.dataset.visible = "true";
  toastTimer = setTimeout(() => {
    toast.dataset.visible = "false";
    toast.textContent = "";
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
    showToast("مقداری برای کپی در دسترس نیست.");
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
  const label = button.matches(".copy-button") ? button.querySelector("span") : null;
  clearTimeout(feedbackTimers.get(button));
  const title = button.querySelector("strong");
  if (title && !button.dataset.originalTitle) button.dataset.originalTitle = title.textContent;
  button.dataset.copied = "true";
  icon.setAttribute("href", "#check");
  if (label) label.textContent = "کپی شد";
  if (title) title.textContent = "کپی شد";

  feedbackTimers.set(button, setTimeout(() => {
    delete button.dataset.copied;
    icon.setAttribute("href", "#copy");
    if (label) label.textContent = "کپی";
    if (title) title.textContent = button.dataset.originalTitle;
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

renderSubscription(subscription);

for (const button of document.querySelectorAll("[data-link]")) {
  const value = webUrl(subscription.links[button.dataset.link]);
  if (!value) continue;
  button.hidden = false;
  button.addEventListener("click", () => handleCopy(button, value, "لینک کپی شد."));
}

const configList = document.querySelector(".config-list");
const configRow = document.querySelector("#config-row");
const counts = new Map();

for (const value of new Set(subscription.configs)) {
  const protocol = /^([a-z][a-z0-9+.-]*):\/\//i.exec(value)?.[1].toUpperCase();
  if (!protocol || ["HTTP", "HTTPS", "JAVASCRIPT", "DATA", "FILE"].includes(protocol)) continue;

  const count = (counts.get(protocol) ?? 0) + 1;
  counts.set(protocol, count);

  const row = configRow.content.cloneNode(true);
  const label = count === 1 ? protocol : protocol + " " + persianNumber.format(count);
  row.querySelector("bdi").textContent = label;
  const button = row.querySelector("button");
  button.setAttribute("aria-label", "کپی کانفیگ " + label);
  button.addEventListener("click", () => handleCopy(button, value, "کانفیگ کپی شد."));
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
