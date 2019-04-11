setInterval(
    ()=>{
        var skip = document.querySelector('[aria-label="Skip Intro"]');
        var playing = document.querySelector('[aria-label="Pause"]');        
        if (skip && playing) {
            skip.click(); 
            console.info('Intro Skipped.');
            setTimeout(()=>{
                var paused = document.querySelector('[aria-label="Play"]');        
                if (paused) 
                {
                    paused.click();
                    console.info('Play Button Clicked.');
                }
            },500);
        }
       
        var next = document.querySelector('div.PlayIcon');
        if (next) {
            next.click();
            console.info('Next Episode.')
        }
        }
    ,2000);