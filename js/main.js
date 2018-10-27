window.onload = function() {
    // copy from Maxence
    function goToPage(link){
        $('[data-page]').each(function(){
            var page = $(this).data('page');
            if(page == link){
                $(this).show();
            } else {
                $(this).hide();
            }
        });
        $('li.nav-item').each(function(){
            var href = $(this).find('a.nav-link').attr('href')
            if (href === link) 
              $(this).addClass('active')
            else
              $(this).removeClass('active')
          })
    
    }
    
    // go to main page
     goToPage('home');
    // goToPage('play');
    
    // Hint: event.preventDefault
    $("a").click(function(event){
        event.preventDefault();
        var href = $(this).attr('href');
        goToPage(href)
        clearGame();
        drawBg();
    })

    // Play part
    // draw background of the game
    drawBg();
    // start/stop game
    startBtn.onclick = function(evt){
        gameState = 0;
        evt.preventDefault()
        if(startBtn.innerText == "Start Game"){
            startBtn.innerText = "Stop Game" 
            drawingFirstElements();
            gameInterval = setInterval(gameUpdate, 2000/timeSpan)

            if (pauseBtn.innerText == "Pause"){
                document.onkeydown = function(e) {
                    var keycode = e.keyCode;
                    snake.dirChage(keycode);
                    e.preventDefault()
                }
            }  
        } else {
            clearGame();
            drawBg();
        }
    }

    // pause/stop game
    pauseBtn.onclick = function(evt){
        evt.preventDefault()
        // if(startBtn.innerText == "Stop Game"){
            if(pauseBtn.innerText == "Pause"){
                pauseBtn.innerText = "Continue";
                clearInterval(gameInterval);
            } else {
                clearInterval(gameInterval);
                pauseBtn.innerText = "Pause";
                gameInterval = setInterval(gameUpdate, 2000/timeSpan)
            }
        // }
    }

    // auto play
    autoBtn.onclick = function(evt){
        window.addEventListener('keydown', function (event) {
            var keycode = event.keyCode
            if(keycode === 13 || keycode === 32 || keycode === 37 || keycode === 38 || keycode === 39 || keycode === 40){
                event.preventDefault();
                return false;
            }
        });
        gameState = 1;
        drawingFirstElements();
        gameInterval = setInterval(gameUpdate, 2000/timeSpan)
    }

    // score list part
    // show and clear score
    ul = $("#score-list");
    for(var i = 1; i < storage.length+1; i++){
        var curPlayer = "player" + i;
        var curScore = storage.getItem(curPlayer)
        var curli = $("<li class='list-group-item'></li>");
        curli.text(curPlayer + " : " + curScore);
        ul.append(curli);
    }

    $("#clearScore").click(function(evt){
        evt.preventDefault()
        storage.clear();
    })
}