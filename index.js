let korb
let scoreText
let lifeText
let eggExists
let scoreCounter
let lifeCounter
let egg
let eggPosition
let eggStepCount
let gamespace
let playerPosition
let updateIntervall
let gameRunning


// Helper Funktionen

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function addScore() {
    scoreCounter++
    scoreText.html(scoreCounter)
}

function removeLife() {
    lifeCounter--
    if (lifeCounter > 0) {
        lifeText.html(lifeCounter)
    } else {
        gameOver()
    }

}
// Game

$(() => {
    setupGame()
})

// Funktion welche den gamestate initialisiert
function setupGame() {
    scoreCounter = 0
    lifeCounter = 3
    playerPosition = 1 // BottomLeft
    eggExists = false
    korb = $(".korb")
    scoreText = $("#Score")
    lifeText = $("#Lifes")
    gamespace = $(".gamespace")
    updateIntervall = setInterval(updateFunction, 500)
    $(document).on('keydown', move)

    gameRunning = true;
}

// Funktion welche den Korb bewegt
function move(event) {
    if (!gameRunning) return

    switch (event.key) {
        case "q":
            korb.css('left', '200px');
            korb.css('top', '250px');
            playerPosition = 0
            break;
        case "y":
            korb.css('left', '200px');
            korb.css('top', '375px');
            playerPosition = 1
            break;
        case "*":
            korb.css('left', '470px');
            korb.css('top', '250px');
            playerPosition = 2
            break;
        case "-":
            korb.css('left', '470px');
            korb.css('top', '375px');
            playerPosition = 3
            break;
    }
}

function updateFunction() {
    console.log("updated")
    if (!eggExists) {
        spawnEgg()
    } else {
        udpateEgg()
    }
}

function spawnEgg() {
    eggPosition = getRandomInt(4)
    egg = $('<div class="egg"></div>')
    switch (eggPosition) {
        case 0:
            // TopLeft
            egg.css('left', '50px');
            egg.css('top', '150px');
            break
        case 1:
            // BottomLeft
            egg.css('left', '50px');
            egg.css('top', '250px');
            break
        case 2:
            // TopRight
            egg.css('left', '625px');
            egg.css('top', '150px');
            break
        case 3:
            // BottomRight
            egg.css('left', '625px');
            egg.css('top', '250px');
            break
        default:
            console.log("Stuff broke und es wurde eine falsche Zahl generiert" + eggPosition)
    }
    eggExists = true
    eggStepCount = 1
    gamespace.append(egg)
}

function udpateEgg() {
    // nach dem erstellen in random intervallen noch 3 mal runter steppen
    // nund bei dem 4ten extra step in den Korb fallen
    // wenn gefangen addScore
    // wenn nicht live decrementen
    if (eggStepCount < 4) {
        let stepDirectionX = 40
        let stepDirectionY = 15
        var xPos = parseInt(egg.css("left"), 10)
        var yPos = parseInt(egg.css("top"), 10)

        if (eggPosition < 2) {
            // auf einem der linken balken
            xPos += stepDirectionX
            yPos += stepDirectionY
        } else {
            // auf einem der rechten balken
            xPos -= stepDirectionX
            yPos += stepDirectionY
        }

        egg.css("left", xPos + 'px')
        egg.css("top", yPos + 'px')
        eggStepCount++
    } else {
        if (playerPosition == eggPosition) {
            addScore()
        } else {
            removeLife()
        }
        eggExists = false;
        eggStepCount = 0
        eggPosition = 0
        egg.remove()
    }
}

function gameOver() {
    clearInterval(updateIntervall)
    gameRunning = false;
}