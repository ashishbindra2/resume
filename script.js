const root = document.documentElement;
const themeBtn = document.getElementById("theme");
const toast = document.getElementById("toast");

const isDark = () =>
  root.dataset.theme ? root.dataset.theme === "dark"
                     : matchMedia("(prefers-color-scheme: dark)").matches;

function syncThemeBtn() {
  const dark = isDark();
  themeBtn.querySelector("ion-icon").setAttribute("name", dark ? "sunny-outline" : "moon-outline");
  themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
}

themeBtn.addEventListener("click", () => {
  root.dataset.theme = isDark() ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  syncThemeBtn();
});
syncThemeBtn();

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast.t);
  showToast.t = setTimeout(() => toast.classList.remove("show"), 1800);
}

document.getElementById("copy").addEventListener("click", () => {
  navigator.clipboard.writeText("ashishbindra2@gmail.com")
    .then(() => showToast("Email copied"))
    .catch(() => showToast("Couldn't copy. Select the email and copy it manually."));
});

// Open every section before printing so nothing is hidden in the PDF
document.getElementById("print").addEventListener("click", () => window.print());
window.addEventListener("beforeprint", () =>
  document.querySelectorAll("details").forEach(d => (d.open = true)));
