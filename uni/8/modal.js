const apiUrl = "https://formcarry.com/s/Ycb60_rhNHC";
const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
};

function updateHistory() {
    window.history.pushState({ modalVisible: true }, "", "#modal");
}

function navigateBack() {
    window.history.back();
}

function manageModal() {
    const modalInstance = bootstrap.Modal.getInstance(
        document.getElementById("dataModal")
    );

    if (window.location.hash.match(/^#modal$/)) {
        modalInstance.show();
    } else {
        modalInstance.hide();
    }
}

function submitForm(event) {
    event.preventDefault();
    if (!document.querySelector("form").reportValidity()) {
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", apiUrl);
    Object.keys(headers).forEach(function (key) {
        xhr.setRequestHeader(key, headers[key]);
    });
    const formData = {};
    const inputFields = document
        .querySelectorAll(".form-control:not(.form-label)");
    inputFields.forEach(function (input) {
        formData[input.name] = input.value;
    });

    xhr.send(JSON.stringify(formData));
    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            const responseElement = document.querySelector(".response");
            if (this.status === 200) {
                responseElement.innerHTML = "Your response has been submitted!";
                inputFields.forEach(function (input) {
                    input.value = "";
                });
            } else {
                responseElement.innerHTML = "Something was wrong...";
            }
            navigateBack();
        }
    };
}


window.addEventListener("DOMContentLoaded", function () {
    new bootstrap.Modal(document.getElementById("dataModal"));
    manageModal();

    document.getElementById("buttonModal")
        .addEventListener("click", updateHistory);
    document.getElementById("buttonClose")
        .addEventListener("click", navigateBack);

    window.addEventListener("popstate", manageModal);
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && window.location.hash.match(/^#modal$/)) {
            navigateBack();
        }
    });

    document.querySelector("form").addEventListener("submit", submitForm);
});

