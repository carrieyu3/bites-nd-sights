document.addEventListener('DOMContentLoaded', function() {
    const encryptedEmail = new URLSearchParams(window.location.search).get('encryptedEmail');
    if (encryptedEmail) {
        console.log(encryptedEmail);
        const hiddenField = document.getElementById('encryptedEmail');
        if (hiddenField) {
            hiddenField.value = encryptedEmail;
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
        if (hiddenField) {
            console.log('Hidden field vlaue');
            hiddenField.value = encryptedEmail;
        } else {
            console.error('Hidden field not found');
        }
    }
});