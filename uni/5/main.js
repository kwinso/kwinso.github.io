const quantityRegex = /^[1-9]\d*$/;

window.addEventListener("DOMContentLoaded", function () {
    document.getElementById("calculate").addEventListener("click", function () {
        const productPrice = parseInt(document.getElementById("product").value);

        const quantityRaw = document.getElementById("quantity").value;
        if (!quantityRegex.test(quantityRaw)) {
            window.alert("Введите число в диапазоне от 1 до 9");
            return;
        }
        const quantity = parseInt(quantityRaw);

        const totalCost = productPrice * quantity;
        document.getElementById("result").innerText = `$${totalCost}`;
    });
});
