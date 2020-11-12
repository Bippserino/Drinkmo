var deck
var previousCard
var currentCard

// After replaying game, first drawn card is not shown

class Deck {

    // Returns deck of 52 cards in format [cardColor, cardSymbol, cardStrength]
    static generateDeck () {

        let fDeck = []
        let possibleColors = ["b", "w"]
        let possibleCards = Array.from({length: 0}, (_, i) => (i + 2).toString())
        possibleCards = possibleCards.concat(["b", "d", "k", "a"])
        for (let i = 0; i < 2 * possibleColors.length; i++) {
            for (let j = 0; j < possibleCards.length; j++) {
                let strength = Deck.getStrenght(possibleCards[j])
                fDeck.push([possibleColors[i % 2], possibleCards[j], strength]);
            }
        }
        return fDeck
    }

    // Returns shuffeled deck
    static shuffleDeck (fDeck) {
        
        for (let i = fDeck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = fDeck[i];
            fDeck[i] = fDeck[j];
            fDeck[j] = temp;
        }

        return fDeck
    }

    // Returns and saves drawn card from the deck
    static drawCard () {

        currentCard = deck.pop()

        if (deck.length !== 0) {
            UI.updateCardCount()
        }
        else {
            $(".stationary-deck").hide(300)
            $(".game__window--card-counter p").hide()
        }
        return currentCard
    }

    // Returns cards strength as number
    static getStrenght (card) {

        switch (card) {
            case "b":
                return 11
                break;

            case "d":
                 return 12
                break

            case "k":
                return 13
                break

            case "a":
                return 14
                break
            
            default:
                return parseInt(card, 10)
                break;
        }
    }

    // Check if current card is higher than previous
    static isHigherThanPrevious () {
        return currentCard[2] >= previousCard[2]  
    }

    // Check if current card is lower than previous
    static isLowerThanPrevious () {
        return currentCard[2] <= previousCard[2]  
    }
}

class UI {
    
    // Places card image on the screen
    static placeCardImg (card) {
        $(".drawn-card").attr("src", `cards/${card[0] + "-" + card[1]}.svg`);
        $(".drawn-card").show(300)
    }
    // Show how many cards are left in deck
    static updateCardCount() {
        $(".game__window--card-counter p").text(deck.length)
    }

    static placeAnswerImage(answer) {
        $(".game__window--answer-box").html(`<img src="img/${answer}.svg" alt="correct" class="game__window--answer-img">`)
        $(".game__window--answer-box").ready(() => {
            $(".game__window--answer-img").show(0,() => {
            $(".game__window--answer-img").hide(1000, () => {
                $(".game__window--answer-img").remove()
            })
        })
        })         
    }

    static handleLastCardBeingDrawn() {
        UI.placeCardImg(currentCard)
        if (deck.length !== 0) EventListeners.controls()
        else {
            $(".game__window--button").hide(300)
            $(".drawn-card").click(() => {
            $(".drawn-card").hide(1000, () => {
                $(".stationary-deck").show()
                currentCard = ""
                previousCard = ""
                })      
             })
        }
    }
}

class Controls {
    static IsAnswerCorrect(control) {
        let answer
        switch (control) {

            case "higher":
                if (Deck.isHigherThanPrevious()) answer = "correct"
                else answer = "wrong"
                break;

            case "lower":
                if (Deck.isLowerThanPrevious()) answer = "correct"
                else answer = "wrong"
            default:
                break;
            }
        return answer
    }
}

class ELHandlers {

    // Higher or lower controls
    static handleControls (control) {
        Deck.drawCard()
        $(".game__window--button").off("click")
        if (deck.length === 0) {
            $(".drawn-card").hide(1000, () => {
                UI.handleLastCardBeingDrawn()
            })
        }
        else {
            $(".drawn-card").fadeOut(1000, () => {
                UI.handleLastCardBeingDrawn()
            })
        }

       UI.placeAnswerImage(Controls.IsAnswerCorrect(control))
       previousCard = currentCard
    }

    // Starts the game when deck is pressed or draws new card if game has already started
    static handleGameStart() {
        if (deck === undefined || deck.length === 0) {
            $(".game__window--card-counter p").show()
            EventListeners.controls()
            deck = Deck.shuffleDeck(Deck.generateDeck())
            UI.placeCardImg(Deck.drawCard())
            previousCard = currentCard      
        }
    }
}

class EventListeners {

    // Enables higher or lower controls
    static controls () {
        const buttonsDOM = [...$(".game__window--button")]
        buttonsDOM.forEach(button => {
            $(button).click((event) => {
                $(".game__window--button").show(300)
                ELHandlers.handleControls(event.target.classList[0])
            })
        })
    }

    // Enables game start
    static gameStart () {
        const startButtonDOM = $(".stationary-deck")
        $(startButtonDOM).click(() => {
            $(".game__window--button").show(300)
            $(".drawn-card").show(300)        
            ELHandlers.handleGameStart()
        })
    }
}

EventListeners.gameStart()