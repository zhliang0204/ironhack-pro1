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
})