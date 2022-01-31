//La génération de bulle a été faite en se basant sur cette vidéo dans le but d'apprendre le javaScript https://www.youtube.com/watch?v=6q-zt0aQ74U
//Nous avons ensuite le code à ce que nous attendions en retour

const scoreUtilisateur = document.querySelector(".scoreUtilisateur");    //On récupère dans lune variable l'emplacement du score du joueur dans le fichier html
let counter = 0;    //nombre de points

//Création d'une bulle
const constructionBulle = () => { 
    const bubble = document.createElement("span");  //On crée un élement html de type de span
    bubble.classList.add("bubble"); //On affecte à l'élement span créé la class bubble
    document.body.appendChild(bubble);  //On ajoute le span au code html

    const size = Math.random() * 200 + 100 + "px";  //On crée la taille de la bulle et on la stock 
    bubble.style.height = size; //On affecte à la hauteur de la bulle la taille obtenu aléatoirement
    bubble.style.width = size;  //On affecte à la largeur de la bulle la taille obtenu aléatoirement

    bubble.style.top = "100%"; //La bulle apparaît tout en bas de l'écran
    bubble.style.left = Math.random() * 100 + "%";  //La bulle apparaît de manière random sur la largeur de l'écran de l'ecran

    const gaucheDroite = Math.random() > 0.5 ? 1 : -1; // Si le nombre random est positif alors on récupère 1 sinon on récupère -1 (pour définir dans quel sens va la bulle crée)
    
    bubble.style.setProperty("--left", Math.random() * 100 * gaucheDroite + "%");  //Création de la destination de la bulle sur l'axe des x de l'écran

    bubble.addEventListener("click", () => {    //Ajours un évenement lors du clique sur une bulle
        counter ++; //On incrémente la variable counter si si on a cliqué sur une bulle 
        scoreUtilisateur.textContent = "Votre score : " + counter;   //On remplace ce qu'il y a écrit dans le titre h3 de lapage html par le score du joueur
        bubble.remove();    //On supprimer la bulle sur laquelle on a cliqué
    });

    setTimeout(() => {  //On déclenche ce qu'il y a l'intérieur dans x microsecondes définies
        bubble.remove();    //On supprime une bulle si elle a dépassée les x microsecondes définies
    }, 8000);
};


var x = setInterval(constructionBulle, 500); // On crée une nouvelle bulle tous les y microsecondes définies




setTimeout(() => {  //On stop le jeu au bout z microsecondes définies
    
    clearInterval(x)    //On stoppe la génération de bulles
    
    setTimeout(() => { //Création d'un formulaire à envoyé peu de temps après la fin du jeu pour laisser au joueur le temps de lciquer sur les dernière bulles encore en vie
        var section = document.querySelector(".formulaireScore")

        var score = document.createElement("input");   //Création de l'input pour l'envoi de formulaire
        score.setAttribute("type", "Number");
        score.setAttribute("hidden","hidden");
        score.setAttribute("name", "score");
        score.setAttribute("value", counter);
        section.appendChild(score);

        var buttonSubmit = document.createElement("input")  //Input qui correspond au submit
        buttonSubmit.setAttribute("type", "submit");
        buttonSubmit.setAttribute("hidden","hidden");
        buttonSubmit.setAttribute("value", "Submit");
        section.appendChild(buttonSubmit);
        
        document.querySelector(".formulaireScore").submit() //Envoie automatique du formulaire
    },3000);

},5000);   //Le nombre de microsecondes avant d'arrêter le jeu

console.log(typeof(counter))
//module.exports = { counter }; //Ne peut pas être récuperer dans le fichier app.js car node n'a pas d'interface 