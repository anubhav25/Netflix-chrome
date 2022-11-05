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

let already_hidden = null;
let hidingJobId = null;

function allChild(node, bottom = null, arr = []) {
  if (bottom && node === bottom) {
    return arr;
  }
  arr.push(node);
  for (let x of node.childNodes) {
    allChild(x, bottom, arr);
  }
  return arr;
}
function allParents(node, upto, arr = []) {
  arr.push(node);
  if (node && upto !== node && node.parentNode) {
    return allParents(node.parentNode, upto, arr);
  }
  return arr;
}

function setVisible(node) {
  try {
    node.style.visibility = "";
  } catch {}
}

function setHidden(node) {
  try {
    node.style.visibility = "hidden";
  } catch {}
}

function hideControls() {
  if (site) {
    switch (site) {
      case PRIME_VIDEO: {
        window.addEventListener("keypress", function (event) {
          // If the user presses the "Enter" key on the keyboard
          if (["p", "P"].includes(event.key)) {
            clearInterval(hidingJobId);
            ((hidden) => {
              hidingJobId = setInterval(() => {
                const a = document.querySelector(".webPlayerUIContainer");
                const b = document.querySelector(
                  ".atvwebplayersdk-captions-text"
                );
                if (hidden) {
                  console.log("UN-hiding all data except subtitles");
                  allChild(a).forEach(setVisible);
                } else {
                  console.log("hiding all data except subtitles");
                  allChild(a, b).forEach(setHidden);
                }
                allParents(b, a).forEach(setVisible);
              }, 2000);
            })(!!already_hidden);
            already_hidden = !already_hidden;
          }
        });
      }
      default:
        return;
    }
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
