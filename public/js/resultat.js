var btn = document.querySelector(".button-reset");

btn.addEventListener('click', function(event) {
    var section = document.querySelector(".formulaireScore")
    document.querySelector(".formulaireScore").submit() //Envoie automatique du formulaire
});