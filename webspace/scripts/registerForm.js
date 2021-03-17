function validateInput() {
    
    let registerForm = document.querySelectorAll("form")[0];

    if (!areTextBoxesFilled(registerForm)) {
        printError("Nicht alle Text-Felder wurden ausgefüllt!");
        return false;
    }

    if (!isAddressFilled(document.getElementById("textarea-address"))) {
        printError("Bitte spezifizieren Sie ihre Addresse!");
        return false;
    }

    if (!isGenderSelected()) {
        printError("Bitte wählen Sie ein Geschlecht aus!");
        return false;
    }

    if (!isMajorSelected()) {
        printError("Bitte wählen Sie mindestens einen Studiengang!");
        return false;
    }

    if (!isPermissionSelected()) {
        printError("Bitte wählen Sie mind. eine Berechtigungsstufe aus!");
        return false;
    }

    if (!isUserIDValid(document.getElementById("textfield-userid").value)) {
        document.getElementById("textfield-userid").focus();
        printError("Die User-ID entspricht nicht der Vorgabe!\r\n\r\nDie User-ID muss zwischen 5 und 8 Zeichen lang sein und darf nur Buchstaben und Unterstriche enthalten. Das erste Zeichen darf kein _ sein!");
        return false;
    }

    if (!isPasswordValid(document.getElementById("textfield-password").value)) {
        document.getElementById("textfield-password").focus();
        printError("Das Passwort entspricht nicht der Vorgabe!\r\n\r\nDas Passwort muss zwischen 6 und 9 Zeichen lang sein und mit einem Buchstaben anfangen. Es dürfen nur Buchstaben, Ziffern und Unterstriche vorkommen!")
        return false;
    }

    if (!isPasswordConfirmationEqual(document.getElementById("textfield-password").value, document.getElementById("textfield-password-confirmation").value)) {
        document.getElementById("textfield-password-confirmation").focus();
        printError("Das Bestätigungspasswort stimmt nicht mit dem angegebenen Passwort überein!");
        return false;
    }

    if (!checkIfEMailSyntaxCorrect(document.getElementById("textfield-email").value)) {
        document.getElementById("textfield-email");
        printError("Die eMail enspricht nicht den nötigen Voraussetzungen.");
        return false;
    }

    return true;

}

function printError(message) {
    alert("Fehler:\r\n\r\n" + message);
}

function deleteDefaultAddressText(addressTextArea) {

    let textareaElement = document.getElementById("textarea-address");

    if (textareaElement.value == "Adresse hier eingeben . . .") {
        textareaElement.value = "";
    }

}

function addDefaultAddressTextIfEmpty() {

    let textareaElement = document.getElementById("textarea-address");

    if (textareaElement.value == "") {
        textareaElement.value = "Adresse hier eingeben . . .";
    }

}


function areTextBoxesFilled(registerForm) {

    for (let i = 0, element; element = registerForm.elements[i]; ++i) {

        if (((element.type == "text") || (element.type == "password")) && (element.value == "")) {
            element.focus();
            return false;
        }

    }

    return true;

}

function isAddressFilled(textareaAddress) {

    if ((textareaAddress.value == "Adresse hier eingeben . . .") || (textareaAddress.value == "")) {
        textareaAddress.focus();
        return false;
    }

    return true;

}

function isGenderSelected() {

    let genderRadioButtons = document.getElementsByName("gender");
    let genderRadioButtonsLength = genderRadioButtons.length;

    for (let i = 0; i < genderRadioButtonsLength; ++i) {

        if (genderRadioButtons[i].checked) {
            return true;
        }

    }

    genderRadioButtons[0].focus();
    return false;

}

function isMajorSelected() {

    let majorList = document.getElementById("studiengang");
    let majorListLength = majorList.length;

    for (let i = 0; i < majorListLength; ++i) {

        if (majorList[i].selected == true) {
            return true;
        }

    }

    majorList.focus();
    return false;

}

function isPermissionSelected() {

    let permissionCheckBoxes = document.getElementsByName("permissions");
    let permissionCheckBoxesLength = permissionCheckBoxes.length;

    for (let i = 0; i < permissionCheckBoxesLength; ++i) {

        if (permissionCheckBoxes[i].checked) {
            return true;
        }

    }

    permissionCheckBoxes[0].focus();
    return false;

}

function isUserIDValid(userIDFieldText) {

    /*
     * zwischen 5 und 8 Zeichen lang sein und darf nur Buchstaben und “_“,
     * keine Leer- oder Sonderzeichen und keine Ziffern enthalten)
     * 
     * ^ signalisiert der Anfang des Strings
     * $ signalisiert das Ende des Strings
     * 
     * [] signalisiert "Jedes dieser"
     * a-zA-Z signalisiert alle Buchstaben von a-Z und A-Z
     * _ signalisiert den Unterstrich
     * {} signalisiert einen Quantifikator
     * {5,8} signalisiert den Quantifikator, dass einen Match bei 5 bis 8 Zeichen gibt
     * 
     */

    return ((userIDFieldText.match(/^[a-zA-Z][a-zA-Z_]{4,7}$/) != null) ? true : false);

}

function isPasswordValid(passwordFieldText) {

    /*
     * zwischen 5 und 8 Zeichen lang sein und darf nur Buchstaben und “_“,
     * keine Leer- oder Sonderzeichen und keine Ziffern enthalten)
     * 
     * ^ signalisiert der Anfang des Strings
     * $ signalisiert das Ende des Strings
     * 
     * [] signalisiert "Jedes dieser"
     * a-zA-Z signalisiert alle Buchstaben von a-Z und A-Z
     * 0-9 signalisiert alle Zahlen zwischen 0-9
     * _ signalisiert den Unterstrich
     * {} signalisiert einen Quantifikator
     * {6,9} signalisiert den Quantifikator, dass einen Match bei 6 bis 9 Zeichen gibt
     * 
     */

    return ((passwordFieldText.match(/^[a-zA-Z][a-zA-Z0-9_]{5,8}$/) != null) ? true : false);

}

function isPasswordConfirmationEqual(passwordFieldText, passwordConfirmationFieldText) {
    return ((passwordFieldText == passwordConfirmationFieldText) ? true : false);
}

function checkIfEMailSyntaxCorrect(eMailAddress) {

    /*
     * Die Regular Expression für eine valide eMail Adresse geht wie folgt:
     * ^[a-zA-Z]((\.[\w-]+)|([\w-]))*(?<!\.)\@([\w-]+\.)+[a-zA-Z]{2,6}$
     *
     * ^ signalisiert der Anfang des Strings
     * $ signalisiert das Ende des Strings
     * 
     * Laut Angabe muss das erste Zeichen ein Buchstabe sein. Deswegen:
     * [a-zA-Z]
     * 
     * Danach muss unterscheidet werden, ob jetzt .92f-__23 oder 92f-__23 steht.
     * Wichtig dabei ist, dass der . nicht doppelt vorkommen darf.
     * Deswegen werden Gruppen genommen, die miteinander verschachtelt werden, wegen der OR-Knüpfung
     * 
     * ((\.[\w-]+)|([\w-]))*
     * 
     * Der * deswegen, weil auch einfach a@meinedomain.at stehen kann!
     * + heißt hier 1x oder mehr, * heißt 0 oder mehrere
     * 
     * Danach muss vor dem @ Zeichen ein Negative Lookback in der RegEx stehen.
     * Dies hat den Grund, dass somit vor dem @ Zeichen KEIN PUNKT stehen darf.
     * (?<!ABC) für einen Negative Lookback
     * 
     * (?<!\.)\@
     * 
     * Jetzt im Domain-Name mit TLD (min. 2, max. 6 Zeichen) und beliebigen Subdomains.
     * 
     * Es muss IMMER mindestens ein Domain-Name stehen. Subdomains sind beliebig. Deswegen:
     * ([\w-]+\.)+
     * 
     * Wenn das Wort zuerst kommt und dann der Punkt, dann wird immer dieses Pattern erkannt.
     * Somit bleibt nur noch die TLD, die ja am Schluss keinen Punkt hat. Simpel realisierbar mit.
     * [a-zA-Z]{2,6}
     * 
    */

    return ((eMailAddress.match(/^[a-zA-Z]((\.[\w-]+)|([\w-]))*(?<!\.)\@([\w-]+\.)+[a-zA-Z]{2,6}$/) != null) ? true : false);

}