// Liste de mots à deviner
const words = ["pain", "lait", "fromage", "houmous", "nouilles"];

// Je sélectionne un mot aléatoire 
let secretWord = words[Math.floor(Math.random() * words.length)];
console.log("mot:", secretWord);

// Je décompose mon mot sélectionné, en lettre séparée dans un tableau
let guessWord = secretWord.split('').fill("_");
console.log(`mot à deviner : ${guessWord}`);
const guessAff = document.getElementById("guess-word");
        guessAff.innerHTML = guessWord;

let count = 2;

const resetGame = () => {
    let secretWord = words[Math.floor(Math.random() * words.length)];
    let guessWord = secretWord.split('').fill("_");
    let count = 2;
}

// Fonction lettre
const guessLetter = (event) => {
    // const letter ='o'; // TEST lettre de l'utilisateur 
    const guessInput = document.getElementById("letter-input");
    const letter = guessInput.value;

    if (secretWord.includes(letter)) { // Je vérifie si la lettre est présente dans le mot
        secretWord.split('').forEach((secretWordLetter, index) => {
            if (secretWordLetter === letter) {
                guessWord[index] = letter; // Je mets à jour mon tableau si la lettre est identique
                console.log(`mot à deviner : ${guessWord}`);  

            }
            if (guessWord.join('') === secretWord) { // je compare si mes mots (tableaux) sont identique
                console.log('BRAVO !');
                const win = document.getElementById("win");
                win.classList.remove('d-none');
                // guessInput.classList.add('d-none');
                resetGame() 
            }
        });

        const guessAff = document.getElementById("guess-word");
        guessAff.innerHTML = guessWord.join(' ');
        console.log(`lettre devinée : ${letter}`);
    }

    if (!secretWord.includes(letter)) { // Si lettre n'est pas présente dans le mot(tableu), j'enleve 1 point à mon compteur 
        count--
        console.log(`Erreur : ${letter}`);

        let letterErreur = document.getElementById('letterErreur');
        letterErreur.classList.remove('d-none');
        let letterErreurMessage = `${letter} <span class="text-danger">X</span> `;
        letterErreur.innerHTML += letterErreurMessage;


        console.log(`il reste ${count} coups`);
        if ((count === 0)) { // Quand je compteur est à 0, la partie est perdu
            console.log(`PERDU !`);
            const loose = document.getElementById("loose");
            loose.classList.remove('d-none');
            resetGame()           
        }
    }
}

const guessBtn = document.getElementById("guess-btn");
guessBtn.addEventListener('click', guessLetter)