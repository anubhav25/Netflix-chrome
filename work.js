const NETFLIX = "netflix";
const HOTSTAR = "hotstar";
const PRIME_VIDEO = "primevideo";

const elementClasses = {
  [NETFLIX]: {
    skip: "button.watch-video--skip-content-button",
    next: 'button[data-uia="next-episode-seamless-button"]',
    next2: 'button[data-uia="next-episode-seamless-button-draining"]',
  },
  [HOTSTAR]: {
    skip: "div.binge-btn-wrapper.show-btn button.primary",
    next: "div.binge-btn-wrapper.show-btn button.filler",
  },
  [PRIME_VIDEO]: {
    ad: ".adSkipButton",
    skip: "button.atvwebplayersdk-skipelement-button",
    next: "div.atvwebplayersdk-nextupcard-button",
  },
};

function getSite() {
  const location = window.location.href;
  for (const site in elementClasses) {
    if (location.includes(site)) {
      return site;
    }
  }
}

const site = getSite();

function hideControls() {
  if (site) {
    switch (site) {
      case PRIME_VIDEO: {
        window.addEventListener("keypress", function (event) {
          // If the user presses the "Enter" key on the keyboard
          if (["p", "P"].includes(event.key)) {
            const currentStyle = document.querySelector(".webPlayerUIContainer")
              .style.display;
            if (currentStyle === "none") {
              document.querySelector(".webPlayerUIContainer").style.display =
                "";
            } else {
              document.querySelector(".webPlayerUIContainer").style.display =
                "none";
            }
          }
        });
      }
      default:
        return;
    }
  }
}

function allChild(node, arr = []) {
  arr.push(node);
  for (let x of node.childNodes) {
    allChild(x, arr);
  }
  return arr;
}
function allParents(node, upto, arr = []) {
  arr.push(node);
  if (upto === node) {
    return arr;
  } else {
    return allParents(node.parentNode, upto, arr);
  }
}

function getElements(selectors) {
  elements = {};
  for (const key in selectors) {
    const selector = selectors[key];
    const element = selector && document.querySelector(selector);
    if (element) {
      elements[key] = element;
    }
  }
  return elements;
}

function runJobToAutoSkip() {
  const selectors = elementClasses[site];
  const interval = setInterval(() => {
    const elements = getElements(selectors);
    for (const key in elements) {
      const element = elements[key];
      if (element) {
        element.click();
        console.info(`${key} clicked`);
      }
    }
  }, 200);
  console.info(`${site} Skip extension initialized with id ${interval}`);
}

runJobToAutoSkip();
hideControls();
console.info(`${site} Skip extension initialized`);
