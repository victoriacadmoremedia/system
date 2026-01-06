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
