/**
 * fonction pour afficher les voitures
 */
function afficherVoiture(){
    //recuperer les donnees du formulaire a partir du serveur
    $.getJSON('https://641b4a829b82ded29d4f1c4e.mockapi.io/voitures')
        .done(function (data) {
            //pour chaque element du tableau data, ajouter;
            data.forEach(function (element) {
                //ajouter des éléments sur la carte
                $('.autoo').append(`
<div class="ttt card mb-2" style="width: 18rem;">
    <img src="${element.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${element.marque}</h5>
    <p id='car${element.id}' class="card-text">${element.id}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${element.modele}</li>
    <li class="list-group-item">${element.annee}</li>
    <li class="list-group-item">${element.prix}<span>$</span></li>
  </ul>
</div>
             `);

            })
        })
}


/**
 * soumission du formulaire
 */
$('form').submit(function (event) {
    let modele=$("#modele").val();
    let codeVoiture=$("#codeVoiture").val();
    $('p.alert').addClass('d-none');
    const msg=$('#codeVoiture + p.alert');
    if (!modele.includes(codeVoiture)){
        msg.text('le modele doit contenir dans code de voiture').removeClass('d-none');
        return false;
    }
    //envoi des donnees du formulaire au serveur
    $.post('https://641b4a829b82ded29d4f1c4e.mockapi.io/voitures', {
        marque: $('#marque').val(),
        modele: $('#modele').val(),
        annee: $('#annee').val(),
        prix: $('#prix').val(),
        codeVoiture: $('#codeVoiture').val(),
        image: $('#urlImage').val()

    })

    //vider le formulaire
    $('form').trigger('reset');
    //stocker les donnees du formulaire dans le local storage
    localStorage.setItem('voitures', JSON.stringify({
        marque: $('#marque').val(),
        modele: $('#modele').val(),
        annee: $('#annee').val(),
        prix: $('#prix').val(),
        codeVoiture: $('#codeVoiture').val(),
        image: $('#urlImage').val()
    }));
    afficherVoiture();
    event.preventDefault();
})

/**
 * fonction pour modifier les voitures
 */
function modifierVoiture(){
    //modifier l'utilisateur avec le id choisi  dans le formulaire
    fetch('https://641b4a829b82ded29d4f1c4e.mockapi.io/voitures/' + $('#id').val(), {
        method: 'PUT',
        headers:{'content-type':'application/json'},
        body: JSON.stringify({  //convertir l'objet en chaine de caractere
            marque: $('#marque').val(),
            modele: $('#modele').val(),
            annee: $('#annee').val(),
            prix: $('#prix').val(),
            id: $('#id').val()
        })
    }).then(function () {
        $('.card' + $('#id').val()).text($('#id').val() + ', ' + $('#marque').val() + ', ' + $('#modele').val() + ', ' + $('#annee').val() + ', ' + $('#prix').val());
    })
}

/**
 * fonction pour supprimer les voitures
 */
function supprimerVoiture(){
    //supprimer l'utilisateur avec le id choisi  dans le formulaire
    fetch('https://641b4a829b82ded29d4f1c4e.mockapi.io/voitures/' + $('#id').val(), {
        method: 'DELETE'
    }).then(function () {
        $('#car' + $('#id').val()).remove();
    })

}
afficherVoiture();




