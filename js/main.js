
const solitaire = {

    deckID: 'y3hglbzqkvno',
    get apiBase(){
        return `https://deckofcardsapi.com/api/deck/${solitaire.deckID}`
    } ,
    rowSelector: "",
    waste: {},
    chosenCard: {},

    foundation: {

        club: {
            cardValue: 0,
            visibleCard: {},
        },

        heart: {
            cardValue: 0,
            visibleCard: {},
        },
    },


    rowSeven: {
        cardData: [],
        cardCodes: [],
        cardValues: [],
        visibleCard: {},

        changeValues: function(){
            for(let i = 0; i < solitaire.rowSeven.cardData.length; i++){
                if(solitaire.rowSeven.cardData[i].value === "JACK"){
                    solitaire.rowSeven.cardValues.push(11)
                }else if(solitaire.rowSeven.cardData[i].value === "QUEEN"){
                    solitaire.rowSeven.cardValues.push(12)
                }else if(solitaire.rowSeven.cardData[i].value === "KING"){
                    solitaire.rowSeven.cardValues.push(13)
                }else if(solitaire.rowSeven.cardData[i].value === "ACE"){
                    solitaire.rowSeven.cardValues.push(1)
                }else{
                    solitaire.rowSeven.cardValues.push(Number(solitaire.rowSeven.cardData[i].value))
                }
            }
        },

        get strCardCodes(){
            return this.cardCodes.join()
        },

        
        
    },

    newButton: document.querySelector('#new'),
    shuffleButton: document.querySelector('#shuffle'),

    drawCard: function(){
        let url = `${solitaire.apiBase}/draw/?count=1`;
        
        fetch(url)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
                console.log(data)
                solitaire.waste = data.cards[0]
                document.querySelector('#waste').src = data.cards[0].image
            })
            .catch(err => {
                console.log(`error ${err}`)
            });
    },

    dealCards: function(){
        let url = `${solitaire.apiBase}/draw/?count=7`;
        
        fetch(url)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
                console.log(data)
                let card = data.cards
                solitaire.rowSeven.cardData = [card[0], card[1], card[2], card[3], card[4], card[5], card[6]];
                solitaire.rowSeven.visibleCard = card[0]
                document.querySelector('#rowSeven').src = solitaire.rowSeven.cardData[0].image
                solitaire.rowSeven.changeValues()
                
            })
            .catch(err => {
                console.log(`error ${err}`)
            });

            document.querySelector('#club').src = ""
            document.querySelector('#heart').src = ""
            solitaire.clubNum = 0
            document.querySelector('#waste').src = ""
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

        document.querySelector('#club').src = ""
    },


    selectCard: function(card) {
        console.log(card.value)

        if(card.value === "JACK"){
            card.value = 11
        }else if(card.value === "QUEEN"){
            card.value = 12
        }else if(card.value === "KING"){
            card.value = 13
        }else if(card.value === "ACE"){
            card.value = 1
        }else{
            card.value = card.value
        }
        
        solitaire.chosenCard = card
        console.log(card.value)

    },

    moveCard: function(a) {
        
        document.querySelector('#club').addEventListener('click', addClub)
        document.querySelector('#heart').addEventListener('click', addHeart)


        

        function addClub() {
            
            solitaire.foundation.club.visibleCard = solitaire[a].visibleCard;
            document.querySelector('#club').src = solitaire.foundation.club.visibleCard.image;
            solitaire[a].cardData.shift()
            solitaire[a].visibleCard = solitaire[a].cardData[0]
            if(solitaire[a].cardData.length === 0){
                document.querySelector(`#${a}`).src = ""
            }else{
                document.querySelector(`#${a}`).src = solitaire[a].cardData[0].image
            }              
            document.querySelector('#club').removeEventListener('click', addClub)
            document.querySelector('#heart').removeEventListener('click', addHeart)
            
        }

        function addHeart() {
            solitaire.foundation.heart.visibleCard = solitaire[a].visibleCard;
            document.querySelector('#heart').src = solitaire.foundation.heart.visibleCard.image;
            solitaire[a].cardData.shift()
            solitaire[a].visibleCard = solitaire[a].cardData[0]
            if(solitaire[a].cardData.length === 0){
                document.querySelector(`#${a}`).src = ""
            }else{
                document.querySelector(`#${a}`).src = solitaire[a].cardData[0].image
            }              
            document.querySelector('#heart').removeEventListener('click', addHeart)
            document.querySelector('#club').removeEventListener('click', addClub)

        }

        
    },

    // addClub: function() {
        
    //     solitaire.foundation.club.visibleCard = solitaire[a].visibleCard;
    //     document.querySelector('#club').src = solitaire.foundation.club.visibleCard.image;
    //     solitaire[a].cardData.shift()
    //     solitaire[a].visibleCard = solitaire[a].cardData[0]
    //     if(solitaire[a].cardData.length === 0){
    //         document.querySelector(`#${a}`).src = ""
    //     }else{
    //         document.querySelector(`#${a}`).src = solitaire[a].cardData[0].image
    //     }              
    //     document.querySelector('#club').removeEventListener('click', addClubFunction)
    //     // document.querySelector('#heart').removeEventListener('click', addHeart)
            
    // },
    
    init: function() {
        solitaire.newButton.addEventListener('click', solitaire.dealCards)
        solitaire.shuffleButton.addEventListener('click', solitaire.shuffle)
        document.querySelector('#stock').addEventListener('click', solitaire.drawCard)
        document.querySelector('#waste').addEventListener('click', function() {solitaire.selectCard(solitaire.waste)})
        document.querySelector('#rowSeven').addEventListener('click', function() {solitaire.moveCard("rowSeven")})
    },

    

}

solitaire.init()
