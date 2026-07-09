(() => {
  const counter = document.getElementById("view-counter");
  const count = document.getElementById("view-count");

  if (!counter || !count) {
    return;
  }

  const endpoint = counter.dataset.viewCounterEndpoint;

  if (!endpoint) {
    return;
  }

  const url = new URL(endpoint, window.location.href);
  url.searchParams.set("path", window.location.pathname || "/");

  fetch(url, { cache: "no-store" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("View counter request failed.");
      }

      return response.json();
    })
    .then((data) => {
      const views = Number(data.views);

      if (!Number.isFinite(views) || views < 0) {
        return;
      }

      count.textContent = new Intl.NumberFormat("en-US").format(
        Math.trunc(views),
      );
      counter.hidden = false;
    })
    .catch(() => {
      // Keep the footer minimal if the counter service is unavailable.
    });
})();
