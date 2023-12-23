// Liste de mots à deviner
const words = [
    "papillon",
    "lutin",
    "bisou",
    "calin",
    "doudou",
    "reve",
    "bisounours",
    "amitie",
    "fee",
    "croissant",
    "chaton",
    "coccinelle",
    "pluie",
    "sourire",
    "gateau",
    "reverie",
    "bulle",
    "poussiere",
    "chant",
    "rire",
    "chateau",
    "princesse",
    "baguette",
    "licorne",
    "magique",
    "feerie",
    "mythique",
    "fantastique",
    "cheval",
    "imaginaire",
    "etincelant",
    "royaume",
    "bague",
    "jouet",
    "peluche",
    "bonbon",
    "fleur",
    "etoile",
    "confettis",
    "joyeux",
    "fourire",
    "bisou",
    "coeur",
    "plume",
    "nuage",
    "poussin"
];

const errorImagesSrc = [
    "./public/assets/img/image6.png",
    "./public/assets/img/image5.png",
    "./public/assets/img/image4.png",
    "./public/assets/img/image3.png",
    "./public/assets/img/image2.png",
    "./public/assets/img/image1.png"
];

// Éléments sélecteurs HTML
const guessInput = document.getElementById("letter-input");
const guessAff = document.getElementById("guess-word");
const secretLose = document.getElementById("word-secret");
const countElement = document.getElementById("count");
const letterErreur = document.getElementById('letterErreur');
const errorImage = document.getElementById("error-img");

let datas = JSON.parse(localStorage.getItem('victoire')) || [];
let victorys = JSON.parse(localStorage.getItem('victoire'));

// Variables
let secretWord;
let guessWord;
let count;

// Fonction pour choisir un mot aléatoire
const randomWord = () => {
    return words[Math.floor(Math.random() * words.length)];
};

// Fonction pour commencer un nouveau jeu
const newGame = () => {
    // Sélectionne un mot aléatoire
    secretWord = randomWord();
    console.log("Mot à deviner :", secretWord);

    // Initialisation du mot à deviner
    guessWord = Array(secretWord.length).fill("_");
    guessAff.innerHTML = guessWord.join(' ');

    // Réinitialisation du compteur
    count = 6;
    countElement.innerHTML = count;
    errorImage.src = './public/assets/img/image-body.png';
    secretLose.innerHTML = '';

    // Cacher les messages de victoire/défaite
    document.getElementById("win").classList.add('d-none');
    document.getElementById("lose").classList.add('d-none');
    document.getElementById("letterErreur").classList.add('d-none');
    document.getElementById("letterErreur").innerHTML = '';
    // document.getElementById("formLetter").classList.remove('d-none');      
};

// Fonction pour gérer la lettre devinée
const guessLetter = () => {
    const letter = guessInput.value.toLowerCase(); // Convertir la lettre en minuscules

    if (secretWord.includes(letter)) {
        // Si la lettre est présente dans le mot secret
        secretWord.split('').forEach((secretWordLetter, index) => {
            if (secretWordLetter === letter) {
                guessWord[index] = letter;
            }
        });
        guessAff.innerHTML = guessWord.join(' '); // j'affiche mes lettres trouvées sur mon html

        if (guessWord.join('') === secretWord) { // si les 2 tableaux de lettre sont identique, gagné
            console.log('BRAVO !');
            document.getElementById("win").classList.remove('d-none');
            document.getElementById("formLetter").classList.add('d-none');    
            errorImage.src = './public/assets/img/image-win.png';



            // LocalStorage
            const data = {
                'mot': secretWord,
            };
            datas.push(data);
            localStorage.setItem('victoire', JSON.stringify(datas));
            display();
        }
    } 


    // Si lettre n'est pas présente dans le mot(tableu), j'enleve 1 point à mon compteur
    if (!secretWord.includes(letter)) {
        count-- // compteur d'erreur
        countElement.innerHTML = count;

        // Affichage des mes images à chaque erreur
        if (count >= 0) {
            errorImage.src = errorImagesSrc[count]; // compteur d'erreur pour afficher mes images
        }

        console.log(`Erreur : ${letter}`);
        letterErreur.classList.remove('d-none');       
        let letterErreurMessage = ` ${letter},`;
        letterErreur.innerHTML += letterErreurMessage;
        

        console.log(`il reste ${count} coups`);
        if ((count === 0)) { // Quand je compteur est à 0, la partie est perdu
            console.log('PERDU !');
            document.getElementById("lose").classList.remove('d-none');
            document.getElementById("formLetter").classList.add('d-none');    
            secretLose.innerHTML = `le mot était : ${secretWord}`;
        }
    }

    guessInput.value = '';
};

window.addEventListener("load", () => {
    newGame();
    display(); // Afficher les victoires au chargement
});

// Fonction pour afficher mon LocalStorage sur mon HTML
const display = () => {
    let listVictory = document.getElementById('victory');
    listVictory.innerHTML = ''; // Effacer le contenu précédent

    datas.forEach(victory => {
        let name = victory.mot;
        let victoryElement = `
            <p class="gluten-400 mb-1">Mot trouvé : ${name}</p>
        `;
        listVictory.innerHTML += victoryElement;
    });
};

// Fonction pour gérer le clic sur un bouton de lettre
const letterButtonClick = (event) => {
    const letter = event.target.dataset.letter.toLowerCase();
    guessInput.value = letter;
    guessLetter();
};

// Ajouter des écouteurs d'événements pour chaque bouton de lettre
const letterButtons = document.querySelectorAll('.letter-btn');
letterButtons.forEach(button => {
    button.addEventListener('click', letterButtonClick);
});

console.log(letterButtonClick);

const newGameBtn = document.getElementById("newGameBtn");
newGameBtn.addEventListener('click', newGame);

// const guessBtn = document.getElementById("guess-btn");
// guessBtn.addEventListener('click', guessLetter);

