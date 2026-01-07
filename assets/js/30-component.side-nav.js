/**
 * Side navigation – collapsible (multi-level)
 * Uses aria-expanded + hidden attribute
 *
 * HTML requirements:
 * - .side-nav__toggle (button)
 * - aria-controls="id-of-panel"
 * - controlled element has [hidden]
 */

(function ($) {
  function initSideNav() {
    $(document).on("click", ".side-nav__toggle", function () {
      var $toggle = $(this);
      var isExpanded = $toggle.attr("aria-expanded") === "true";
      var panelId = $toggle.attr("aria-controls");
      var $panel = $("#" + panelId);

      if (!$panel.length) return;

      // OPTIONAL: close siblings at the same level
      closeSiblingPanels($toggle);

      // Toggle current
      $toggle.attr("aria-expanded", String(!isExpanded));

      if (isExpanded) {
        $panel.attr("hidden", true);
      } else {
        $panel.removeAttr("hidden");
      }
    });
  }

  function closeSiblingPanels($toggle) {
    var $parentList = $toggle.closest("ul");

    $parentList
      .find('> .side-nav__item > .side-nav__toggle[aria-expanded="true"]')
      .not($toggle)
      .each(function () {
        var $btn = $(this);
        var panelId = $btn.attr("aria-controls");
        var $panel = $("#" + panelId);

        $btn.attr("aria-expanded", "false");
        if ($panel.length) {
          $panel.attr("hidden", true);
        }
      });
  }

  $(initSideNav);
})(jQuery);

(function () {
  const nav = document.querySelector(".side-nav__list");
  if (!nav) return;

  // Normalise current path (ignore query/hash, allow trailing slash + index.html)
  const currentPath = window.location.pathname
    .replace(/\/index\.html$/, "/")
    .replace(/\/$/, "/");

  const links = nav.querySelectorAll("a.side-nav__link[href]");

  // Find best match: exact match preferred, otherwise match after normalisation
  let activeLink = null;

  links.forEach((link) => {
    const url = new URL(link.getAttribute("href"), window.location.origin);
    const linkPath = url.pathname
      .replace(/\/index\.html$/, "/")
      .replace(/\/$/, "/");

    if (linkPath === currentPath) {
      activeLink = link;
    }
  });

  // If no exact match, allow matching /section/ to /section/index.html behaviour
  if (!activeLink) {
    links.forEach((link) => {
      const url = new URL(link.getAttribute("href"), window.location.origin);
      const linkPath = url.pathname.replace(/\/$/, "/");
      if (currentPath.startsWith(linkPath) && linkPath !== "/") {
        activeLink = activeLink || link;
      }
    });
  }

  if (!activeLink) return;

  // Apply active styles
  activeLink.classList.add("side-nav__link--active");
  activeLink.setAttribute("aria-current", "page");

  const activeItem = activeLink.closest(".side-nav__item");
  if (activeItem) activeItem.classList.add("side-nav__item--active");

  // Expand any parent sublists so the active link is visible
  const parentSublists = activeLink.closestAll
    ? activeLink.closestAll(".side-nav__sublist")
    : (function () {
        // closestAll fallback
        const lists = [];
        let el = activeLink.parentElement;
        while (el) {
          if (el.classList && el.classList.contains("side-nav__sublist"))
            lists.push(el);
          el = el.parentElement;
        }
        return lists;
      })();

  parentSublists.forEach((sublist) => {
    sublist.hidden = false;

    // Find controlling toggle for this sublist by id
    const id = sublist.getAttribute("id");
    if (!id) return;

    const toggle = nav.querySelector(
      `button[aria-controls="${CSS.escape(id)}"]`
    );
    if (toggle) toggle.setAttribute("aria-expanded", "true");

    const parentItem = sublist.closest(".side-nav__item");
    if (parentItem) parentItem.classList.add("side-nav__item--expanded");
  });
})();

/**
 * Side navigation – mobile drawer
 * - Single menu markup used for both mobile (drawer) and desktop (sidebar)
 * - Adds/removes .is-open on the drawer nav, toggles backdrop, supports ESC
 */
(function () {
  const drawer = document.querySelector("[data-side-nav-drawer]");
  const trigger = document.querySelector("[data-side-nav-trigger]");
  const closeBtn = document.querySelector("[data-side-nav-close]");
  const backdrop = document.querySelector("[data-side-nav-backdrop]");

  if (!drawer || !trigger || !backdrop) return;

  const mqDesktop = window.matchMedia("(min-width: 64rem)");
  let lastFocused = null;

  function setBackdrop(isOpen) {
    if (isOpen) backdrop.removeAttribute("hidden");
    else backdrop.setAttribute("hidden", "");
  }

  function openDrawer() {
    if (mqDesktop.matches) return; // never behave like a drawer on desktop
    lastFocused = document.activeElement;
    drawer.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
    setBackdrop(true);
    document.documentElement.classList.add("side-nav-drawer-open");
    document.body.classList.add("side-nav-drawer-open");
    (closeBtn || drawer).focus?.();
  }

  function closeDrawer() {
    drawer.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
    setBackdrop(false);
    document.documentElement.classList.remove("side-nav-drawer-open");
    document.body.classList.remove("side-nav-drawer-open");
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  trigger.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) {
      e.preventDefault();
      closeDrawer();
    }
  });

  // If we cross into desktop, ensure everything resets
  mqDesktop.addEventListener("change", () => {
    if (mqDesktop.matches) closeDrawer();
  });
})();
