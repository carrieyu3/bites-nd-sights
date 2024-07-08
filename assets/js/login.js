document.addEventListener('DOMContentLoaded', () => {

    // Check for error message in query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const errorMessage = urlParams.get('error');
    if (errorMessage) {
        document.getElementById('error-message-text').textContent = errorMessage;
        document.getElementById('error-message').style.display = "flex";

    }

});

function closeMessage()
{
    document.getElementById('error-message').style.display = "none";
}