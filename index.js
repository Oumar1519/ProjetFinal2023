// Déclaration du regex qui commence par 3 lettres majuscules, 3 lettres minuscules et 3 chiffres
let regex=/^[A-Z]{3}[a-z]{3}[0-9]{3}$/;

//validation du formulaire
function validerFormulaire(motdepas){
    let valid=true;
    $('p.alert').addClass('d-none');
    const msg=$('#motdepas + p.alert');
    if (!regex.test(motdepas)){
        msg.text('le mot de passe doit contenir 3 lettres majuscules 3 lettres minuscule et 3 chiffres').removeClass('d-none');
        valid=false;
    }

    return valid;
}
$('form').submit(function (event) {
    const motdepas=$('#motdepas').val();
    if (validerFormulaire(motdepas)){
        alert('formulaire valide');
        //affichage de la page inscription de voiture
        window.location.href='ajoutVoiture.html';
    }
    event.preventDefault();
})
