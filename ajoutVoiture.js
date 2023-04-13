//recuperer les donnees du serveur
    $.getJSON('https://641b4a829b82ded29d4f1c4e.mockapi.io/voitures')
        .done(function (data) {
            //pour chaque element du tableau data, ajouter;
            data.forEach(function (element) {
                //ajouter des éléments sur la carte
                $('.autoo').append(`
<div id="cart${element.id}" class="ttt card mb-2" style="width: 18rem;">
    <img src="${element.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${element.marque}</h5>
    <p class="card-text">${element.id}</p>
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
    }).then(function (data) {
        //ajouter des éléments sur la carte
        $('.autoo').append(`
<div id="cart${data.id}" class="ttt card mb-2" style="width: 18rem;">
    <img src="${data.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${data.marque}</h5>
        <p class="card-text">${data.id}</p>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">${data.modele}</li>
        <li class="list-group-item">${data.annee}</li>
        <li class="list-group-item">${data.prix}<span>$</span></li>
    </ul>
</div>
`);
        localStorage.setItem('voitures', JSON.stringify(data));
    })

    event.preventDefault();
    //vider le formulaire
    $('form').trigger('reset');
})

/**
 * fonction pour modifier les voitures
 */
function modifierVoiture(){
    let marque=$("#marque").val();
  let modele=$("#modele").val();
    let annee=$("#annee").val();
    let prix=$("#prix").val();
    let codeVoiture=$("#codeVoiture").val();
    let urlImage=$("#urlImage").val();
    $.ajax({
        url: 'https://641b4a829b82ded29d4f1c4e.mockapi.io/voitures/' + $('#id').val(),
        method: 'PUT',
        dataType: 'json',
        data: {
            marque: marque,
            modele: modele,
            annee: annee,
            prix: prix,
            codeVoiture: codeVoiture,
            image: urlImage
        },
        success: function (data) {
            //modifier les elements sur la carte
            $('#cart' + data.id).replaceWith(`
<div id="cart${data.id}" class="ttt card mb-2" style="width: 18rem;">
    <img src="${data.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${data.marque}</h5>
        <p class="card-text">${data.id}</p>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">${data.modele}</li>
        <li class="list-group-item">${data.annee}</li>
        <li class="list-group-item">${data.prix}<span>$</span></li>
    </ul>
</div>
`);
        }
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
        $('#cart' + $('#id').val()).remove();
    })

}





