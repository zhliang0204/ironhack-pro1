
ul = $("#score-list");
for(var i = 1; i < storage.length+1; i++){
    var curPlayer = "player" + i;
     console.log(storage.getItem(curPlayer));
     var curScore = storage.getItem(curPlayer)
     var curli = $("<li class='list-group-item'></li>");
     curli.text(curPlayer + " : " + curScore);
     ul.append(curli);
}

$("#clearScore").click(function(){
    storage.clear();
})