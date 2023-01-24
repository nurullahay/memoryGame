

const section = document.querySelector("section");

// creating div for info of lives and round
const infoBox = document.createElement("div");
infoBox.classList = "infoBox";
document.body.append(infoBox);

const header = document.createElement("h1");
infoBox.append(header);
header.textContent = "Lives : "

const playerLivesCount = document.createElement("span");
header.append(playerLivesCount);
let playerLives = 8;

playerLivesCount.textContent = playerLives;

// info of round
const roundName = document.createElement("h1");
roundName.textContent = "Round : 3"
infoBox.append(roundName);

// button area
const buttonBox = document.createElement("div");
buttonBox.classList = "buttonBox";
document.body.appendChild(buttonBox);
buttonBox.style.display = "none";

// next level button
const nextBtn = document.createElement("button");
nextBtn.classList = "nextBtn";
nextBtn.textContent = "NEXT LEVEL";
buttonBox.appendChild(nextBtn);

// next level button
const againBtn = document.createElement("button");
againBtn.classList = "againBtn";
againBtn.textContent = "PLAY AGAIN";
buttonBox.appendChild(againBtn);

const getData = () => [
    {imgSrc: "../img/panda.png", name: "panda"},
    {imgSrc: "../img/monkey.png", name: "monkey"},
    {imgSrc: "../img/bear.png", name: "bear"},
    {imgSrc: "../img/dog.png", name: "dog"},
    {imgSrc: "../img/cat.png", name: "cat"},
    {imgSrc: "../img/pig.png", name: "pig"},
    {imgSrc: "../img/fox.png", name: "fox"},
    {imgSrc: "../img/leo.png", name: "leo"},
    {imgSrc: "../img/panda.png", name: "panda"},
    {imgSrc: "../img/monkey.png", name: "monkey"},
    {imgSrc: "../img/bear.png", name: "bear"},
    {imgSrc: "../img/dog.png", name: "dog"},
    {imgSrc: "../img/cat.png", name: "cat"},
    {imgSrc: "../img/pig.png", name: "pig"},
    {imgSrc: "../img/fox.png", name: "fox"},
    {imgSrc: "../img/leo.png", name: "leo"}
]

// randomize
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

const cardGenerator = () => {

    const cardData = randomize();

    // generate HTML
    cardData.forEach((item) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");

        card.classList = "card";
        face.classList = "face";
        back.classList = "back";

        // attach the info to the cards
        face.src = item.imgSrc;
        card.setAttribute("name", item.name);
        // append the cards tot the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        // click function
        card.addEventListener("click", (e) => {
            card.classList.toggle("toggleCard");
            checkCards(e);
        });
    });
};

// check cards if they match
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");

    const toggleCard = document.querySelectorAll(".toggleCard");

    // when user click 2 cards
    if(flippedCards.length === 2) {

        // checking if cards are same 
        if(flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")){
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            });
        }else {
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if(playerLives === 0) {
                reStart();
            }
        }
    }
    // we will skip the level when we win
    if(toggleCard.length === 16) {
        setInterval( () => {
            const jsConfetti = new JSConfetti();
            jsConfetti.addConfetti();
            section.style.display = "none";
            buttonBox.style.display = "grid";

            nextBtn.addEventListener("click", () => {
                window.location.href = "../fourtRound/fourt.html"
            })
            againBtn.addEventListener("click", () => {
                window.location.href = "third.html"
            })
        }, 1100);
    }
};

// restart
const reStart = () => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    cardData.forEach((item, index) => {
        cards[index].classList.remove("toggleCard");

        cards[index].style.pointerEvents = "all";
        faces[index].src = item.imgSrc; 
    });
    playerLives = 8;
    playerLivesCount.textContent = playerLives;
};

cardGenerator();