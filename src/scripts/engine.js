const state = {

    score: {
        computerScore: 0,
        playerScore: 0,
        scoreBox: document.getElementById("score-points"),
    },
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards: {
        player: document.getElementById(" player-field-card"),
        computer: document.getElementById(" computer-field-card"),
    },
    actions: {
        button: document.getElementById('next-duel'),
    },
};
const playerSide = {
    player1: "player-cards",
    computer: "computer-cards",
};

const pathImages = "./src/assets/icons/";

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: 'Paper',
        img: '${pathImages}dragon.png',
        winof: [1],
        loseof: [2],
    },
    {
        id: 1,
        name: 'Dark Magician',
        type: 'Rock',
        img: '${pathImages}magician.png',
        winof: [2],
        loseof: [0],
    },
    {
        id: 2,
        name: 'Exodia',
        type: 'Scissors',
        img: '${pathImages}exodia.png',
        winof: [0],
        loseof: [1],
    },
]

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(IdCard, fieldSide) {
    const cardImage = document.createElement('img');
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");

    if (fieldSide === playerSide.player1) {
        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });
    }
    cardImage.addEventListener("mouseover", () => {
        drawSelectCard(IdCard);
    });
    return cardImage;
}

async function drawSelectCard(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Attibute : " + cardData[index].type;
}

async function drawCard(cardNumbers, fieldSide) {

    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }

}

function init() {
    drawCard(5, playerSide.player1);
    drawCard(5, playerSide.computer);
}
init();
