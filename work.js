function getkeys() {
  let skip, playing, paused, next;
  if (window.location.href.includes("netflix")) {
    skip = '[aria-label="Skip Intro"]';
    playing = '[aria-label="Pause"]';
    paused = '[aria-label="Play"]';
    next = "div.PlayIcon";
  } else {
    skip = ".skipElement";
    playing = ".pausedIcon";
    paused = ".playIcon";
    next = ".nextUpCard";
  }
  return [skip, playing, paused, next];
}
let keys = getkeys();
setInterval(() => {
  let [skip, playing, paused, next] = keys.map(x => document.querySelector(x));
  console.log(getkeys());
  if (skip && playing) {
    skip.click();
    console.info("Intro Skipped.");
    setTimeout(() => {
      if (paused) {
        paused.click();
        console.info("Play Button Clicked.");
      }
    }, 500);
  }
  if (next) {
    next.click();
    console.info("Next Episode.");
  }
}, 2000);
