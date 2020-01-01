function getkeys() {
  let skip, playing, paused, next;
  if (window.location.href.includes("netflix")) {
    skip = '[aria-label="Skip Intro"]';
    playing = '[aria-label="Pause"]';
    paused = '[aria-label="Play"]';
    next = "div.PlayIcon";
  } else {
    ad = ".adSkipButton ";
    skip = ".skipElement";
    playing = ".pausedIcon";
    paused = ".playIcon";
    next = ".nextUpCard";
  }
  return [skip, playing, paused, next, ad];
}
let keys = getkeys();
setInterval(() => {
  let [skip, playing, paused, next, ad] = keys.map(x =>
    document.querySelector(x)
  );
  skip = skip || ad;
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
