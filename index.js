let korb;

$(() => {
    setupGame()
})

// Funktion welche den gamestate initialisiert
function setupGame()
{
    korb = $(".korb")
    $(document).on('keydown', move)
}


// Funktion welche den Korb bewegt
function move(event)
{
    switch(event.key)
    {
        case "q":
            korb.css('left','200px');
            korb.css('top','250px');
            break;
        case "y":
            korb.css('left','200px');
            korb.css('top','375px');
            break;
        case "*":
            korb.css('left','470px');
            korb.css('top','250px');
            break;
        case "-":
            korb.css('left','470px');
            korb.css('top','375px');
            break;
    }
}