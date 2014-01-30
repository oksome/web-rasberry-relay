
var relay_button = document.getElementById('relay_button')

// Lit l'état du relai sur le Raspi et actualise l'affichage en fonction:
var updateRelayState = function () {
    $.ajax('/api/relay/status').done( function(status) {
        if (status == 'on') {
            relay_button.innerHTML = 'Eteindre';
            relay_button.className = ['btn btn-large btn-warning'];
        }
        else if (status == 'off') {
            relay_button.innerHTML = 'Allumer';
            relay_button.className = ['btn btn-large btn-info'];
        }
        else {
            alert('weird');
        }
    })
}

// Action en cas de clic de l'utilisateur:
relay_button.onclick = function() {
    // On utilise ici le status du bouton:
    if (relay_button.innerHTML.indexOf('Allumer') != -1) {
        $.ajax('/api/relay/on');
        updateRelayState();
    }
    else {
        $.ajax('/api/relay/off');
        updateRelayState();
    }
}

// Vérification toutes les secondes de l'état du relai
// au cas où il aurait changé à cause d'un autre utilisateur:

var recurrentCheck = function() {
    updateRelayState();
    setTimeout(recurrentCheck, 1000);
}

recurrentCheck();
