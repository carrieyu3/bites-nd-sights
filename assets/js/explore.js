document.addEventListener('DOMContentLoaded', function() {
    const encryptedEmail = new URLSearchParams(window.location.search).get('encryptedEmail');
    if (encryptedEmail) {
        console.log(encryptedEmail);
        const hiddenField = document.getElementById('encryptedEmail');
        const hiddenField2 = document.getElementById('encryptedEmailex');
        const hiddenField3 = document.getElementById('encryptedEmailexe');
        if (hiddenField) {
            hiddenField.value = encryptedEmail;
            hiddenField2.value = encryptedEmail;
            hiddenField3.value = encryptedEmail;
        } else {
            console.error('Hidden field not found');
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const encryptedEmail = new URLSearchParams(window.location.search).get('_k_');
    if (encryptedEmail) {
        console.log(encryptedEmail);
        const hiddenField = document.getElementById('k');
        const hiddenField2 = document.getElementById('kex');
        const hiddenField3 = document.getElementById('kexe');
        if (hiddenField) {
            console.log('Hidden field vlaue');
            hiddenField.value = encryptedEmail;
            hiddenField2.value = encryptedEmail;
            hiddenField3.value = encryptedEmail;
        } else {
            console.error('Hidden field not found');
        }
    }
});

function submitFormIndex() {
    
    // Submit the form
    document.getElementById('index-form').submit();
}


function submitFormExplore() {
    
    // Submit the form
    document.getElementById('explore-form').submit();
}