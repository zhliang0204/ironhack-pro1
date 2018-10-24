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
    
    // Iteration 2: Listen for click events on <a>
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
    startBtn.onclick = function(){
        if(startBtn.innerText == "Start Game"){
            startBtn.innerText = "Stop Game" 
            drawingFirstElements();
            gameInterval = setInterval(function(){
                update();
            }, 2000/timeSpan)

            if (pauseBtn.innerText == "Pause"){
                document.onkeydown = function(e) {
                    var keycode = e.keyCode;
                    e.preventDefault()
                    snake.dirChage(keycode);
                }
            }  
        } else {
            clearGame();
            drawBg();
        }
    }

    // pause/stop game
    pauseBtn.onclick = function(){
        if(startBtn.innerText == "Stop Game"){
            if(pauseBtn.innerText == "Pause"){
                pauseBtn.innerText = "Continue";
                clearInterval(gameInterval);
            } else {
                clearInterval(gameInterval);
                pauseBtn.innerText = "Pause";
                gameInterval = setInterval(function(){
                    update();
                    console.log(timeSpan);
                }, 2000/timeSpan)                   
            }
        }
    }

    // auto play
    autoBtn.onclick = function(){
        drawingFirstElements();
        gameInterval = setInterval(function(){
            update();
            chooseDirection();
        }, 2000/timeSpan)
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

    $("#clearScore").click(function(){
        storage.clear();
    })
}