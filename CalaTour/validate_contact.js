/**
 * Created by Sorina on 18.10.2016.
 */
window.onload = function() {

    var nume = document.getElementById("nume");
    var prenume = document.getElementById("prenume");
    var adresa = document.getElementById("adresa");
    var bth = document.getElementById("bth");
    var phone = document.getElementById("phone");
    var email = document.getElementById("email");

    var regexNume = /\b[A-Za-z]{3,}\b/;
    var regexAdresa = /([a-z,A-Z]){3,}([0-9]){1,}[^@#$%\^&*]/;
    var regexBth = /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
    var regexPhone = /\b([0-9]{3})-([0-9]{9})\b/;
    var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    nume.onblur = function() {
        validate_input(this, regexNume);
    };

    prenume.onblur = function() {
        validate_input(this, regexNume);
    };

    adresa.onblur = function() {
        validate_input(this, regexAdresa);
    };

    bth.onblur = function() {
        validate_input(this, regexBth);
    };

    phone.onblur = function() {
        validate_input(this, regexPhone);
    };

    email.onblur = function() {
        validate_input(this, regexEmail);
    };

    var form = document.getElementById("contact");
    form.onsubmit = function(){
        return false;
    }

    var submitButton = document.getElementById("submit");
    submitButton.onclick = function() {
        var labelsTag = document.getElementsByTagName("label");
        var labelsName = [];
        for (var i = 0; i < labelsTag.length; i++) {
            if (document.getElementById(labelsTag[i].htmlFor)) {
                labelsName[labelsTag[i].htmlFor] = labelsTag[i];
            }
        }

        var errorsMessage = document.getElementById("errors");
        var errorsLabel = document.getElementById("errorsLabel");

        var inputsName = [nume, prenume, adresa, bth, phone, email];
        var inputsRegex = [regexNume, regexNume, regexAdresa, regexBth, regexPhone, regexEmail];
        var errors = [];

        for ( var i = 0; i < inputsName.length; i++ ) {
            if ( !validate_input(inputsName[i], inputsRegex[i]) ) {
                if ( labelsName[inputsName[i].id] )
                    errors.push(labelsName[inputsName[i].id].innerHTML);
            }
        }
        var errorsList = "";
        for ( var i = 0; i < errors.length; i++ ) {
            errorsList += "<li>" + errors[i] + "</li>";

        }
        if ( errors.length != 0 ) {
            errorsLabel.innerHTML = "Datele introduse in urmatoarele campuri sunt invalide:"
            errorsMessage.innerHTML = errorsList;
        }
        else{
            errorsLabel.innerHTML = "Datele introduse sunt corecte!";
            errorsMessage.innerHTML = "";
        }
    }

    var resetButton = document.getElementById("reset");
    resetButton.onclick = function() {
        var inputsName = [nume, prenume, adresa, bth, phone, email];

        for (var i = 0; i < inputsName.length; i++){
            inputsName[i].setAttribute('style', 'background-color: white');
            inputsName[i].value = "";
        }

        var errorsMessage = document.getElementById("errors");
        var errorsLabel = document.getElementById("errorsLabel");
        errorsMessage.innerHTML = "";
        errorsLabel.innerHTML ="";
    }

}

function validate_input(input, regex){
    if ( regex.test( input.value ) ) {
        input.setAttribute('style', 'background-color: white');
        return true;
    }
    else{
        input.setAttribute('style', 'background-color: orange');
        return false;
    }
}