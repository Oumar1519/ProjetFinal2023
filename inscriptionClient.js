//recuperer les donnees
let voitures=JSON.parse(localStorage.getItem('voitures'));
$('#marque').val(voitures.marque);
$('#modele').val(voitures.modele);
$('#annee').val(voitures.annee);
$('#prix').val(voitures.prix);
$('#codeVoiture').val(voitures.codeVoiture)
if(voitures!=null){
    afficherVoiture();
}

/**
 * fonction pour afficher les voitures dans l'option du select
 */
function afficherVoiture(){
    $.getJSON('https://641b4a829b82ded29d4f1c4e.mockapi.io/voitures')
        .done(function (voitures) {
            const liste=$('#model');
            liste.empty();
            voitures.forEach(function (voiture) {
                liste.append(`
 <option value="${voiture.codeVoiture}">${voiture.codeVoiture}</option>
              `);
            })
        })
}

/**
 * fonction pour creer un nouveau client
 * @param nom
 * @param prenom
 * @param courriel
 * @param refClient
 * @param cdVoiture
 * @constructor
 */
function Client(nom,prenom,courriel,refClient,cdVoiture,tel){
    this.nom=nom;
    this.prenom=prenom;
    this.courriel=courriel;
    this.refClient=refClient;
    this.cdVoiture=cdVoiture;
    this.tel=tel;
};

/**
 * fonction pour creer un nouveau client
 */
function clientLocation(){
    this.listClient=[];
    this.ajouterClient=function (client) {
        this.listClient.push(client);
    }
}
//creation du nouveau client
const clientParticipe=new clientLocation();

/**
 * soumission du formulaire
 */
$('form').submit(function (event) {
    event.preventDefault();
    let nom=$("#nom").val();
    let prenom=$("#prenom").val();
    let courriel=$("#mail").val();
    let refClient=$("#ref").val();
    let cdVoiture=$("#model").val();
    let tel=$("#telephone").val();
    clientParticipe.ajouterClient(new Client(nom,prenom,courriel,refClient,cdVoiture,tel));
    afficherClient();
    localStorage.setItem('client',JSON.stringify(clientParticipe));
    //envoi du mail au client apres soumission du formulaire
    window.location.href="mailto:?subject=Reservation&body"+courriel;
})
//recuperer les donnees du local storage
let client=JSON.parse(localStorage.getItem('client'));
$('#nom').val(client.nom);
$('#prenom').val(client.prenom);
$('#mail').val(client.courriel);
$('#ref').val(client.refClient);
$('#model').val(client.cdVoiture);
$('#telephone').val(client.tel);


/**
 * fonction pour afficher les clients
 */
function afficherClient(){
    const liste=$('.auto');
    liste.empty();
    clientParticipe.listClient.forEach(function (client) {
        liste.append(`
<div class="card">
    <div class="card-body">
        <h5 class="card-title">${client.nom},${client.prenom}</h5>
        <p id='car${client.refClient}' class="card-text">${client.refClient}</p>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">${client.cdVoiture}</li>
        <li class="list-group-item">${client.courriel}</li>
        <li class="list-group-item">${client.tel}</li>
    </ul>
</div>
            `)

    })

}
