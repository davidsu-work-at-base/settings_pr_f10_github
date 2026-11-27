// Minimal toast: a short-lived card in the corner of the screen.
export function toast({ title, description, duration = 4000 } = {}) {
  if (typeof document === "undefined") return;

  const container = document.createElement("div");
  container.className =
    "fixed bottom-4 right-4 z-50 w-full max-w-sm rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground shadow-lg";
  container.setAttribute("role", "status");

  if (title) {
    const heading = document.createElement("p");
    heading.className = "font-medium";
    heading.textContent = title;
    container.appendChild(heading);
  }
  if (description) {
    const text = document.createElement("p");
    text.className = "mt-1 text-muted-foreground";
    text.textContent = description;
    container.appendChild(text);
  }

  document.body.appendChild(container);
  setTimeout(() => container.remove(), duration);
}