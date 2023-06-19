
const solitaire = {

    deckID: 'y3hglbzqkvno',
    get apiBase(){
        return `https://deckofcardsapi.com/api/deck/${solitaire.deckID}`
    } ,

    checkCard: {},
    clubNum: 0,

    foundation: {

        club: {
            code: "",
            currentCard: document.querySelector('#club')

        },
    },

    rowSix: {

    },

    rowSeven: {
        currentCard: document.querySelector('#seven'),
        pile: {}
    },

    newButton: document.querySelector('#new'),
    shuffleButton: document.querySelector('#shuffle'),

    dealCards: function(){
        let url = `${solitaire.apiBase}/draw/?count=13`;
        
        fetch(url)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
                console.log(data)
                let card = data.cards
                solitaire.rowSix = [card[0], card[1], card[2], card[3], card[4], card[5]]
                solitaire.rowSeven.pile = [card[6], card[7], card[8], card[9], card[10], card[11], card[12]]
                document.querySelector('#seven').src = solitaire.rowSeven.pile[0].image
                document.querySelector('#six').src = solitaire.rowSix[0].image
                
                
            })
            .catch(err => {
                console.log(`error ${err}`)
            });

            solitaire.foundation.club.currentCard.src = ""
            solitaire.clubNum = 0
    },

    shuffle: function() {
        const url = `${solitaire.apiBase}/shuffle/`

        fetch(url)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
                console.log(data)
                
            })
            .catch(err => {
                console.log(`error ${err}`)
            });

        solitaire.foundation.club.currentCard.src = ""
    },

    compareCard: function(a) {
        if(a === "Seven"){
          solitaire.checkCard = solitaire.rowSeven.pile[0]

        }
    },

    moveCard: function(a) {
        solitaire.foundation.club.currentCard.addEventListener('click', addClub)

        

        function addClub() {
            
            // if(a === 7){
            //     solitaire.checkCard = solitaire.rowSeven.pile[0]
            // }
            // if(solitaire.checkCard.suit === "CLUBS"){
            // solitaire.foundation.club.currentCard.src = solitaire.rowSeven.pile[0].image
            // solitaire.foundation.club.code = solitaire.rowSeven.pile[0].code
            // solitaire.rowSeven.currentCard.src = solitaire.rowSeven.pile[1].image
            // }
            solitaire.foundation.club.currentCard.src = solitaire.rowSeven.pile[solitaire.clubNum].image
            solitaire.foundation.club.code = solitaire.rowSeven.pile[solitaire.clubNum].code
            solitaire.clubNum = solitaire.clubNum + 1
            solitaire.rowSeven.currentCard.src = solitaire.rowSeven.pile[solitaire.clubNum].image
        }
    },

    init: function() {
        solitaire.newButton.addEventListener('click', solitaire.dealCards)
        solitaire.shuffleButton.addEventListener('click', solitaire.shuffle)
        solitaire.rowSeven.currentCard.addEventListener('click', solitaire.moveCard)
    },

    

}

solitaire.init()
