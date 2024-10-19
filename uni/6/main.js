/*jslint browser */

function fetchProducts() {
    return [
        {
            cost: 2000,
            title: "MacBook Air"
        },
        {
            cost: 2499,
            title: "MacBook Pro",
            variants: [
                {
                    cost: 700,
                    title: "Gold edition"
                },
                {
                    cost: 1100,
                    title: "Premium edition"
                },
                {
                    cost: 1500,
                    title: "Ultimate edition"
                }
            ]
        },
        {
            cost: 419,
            features: [
                {
                    cost: 169,
                    title: "MacBook Pro 14-inch - M1 Pro"
                }
            ],
            title: "MacBook Pro 14-inch"
        },
        {
            cost: 1999,
            features: [
                {
                    cost: 449,
                    title: "16GB RAM Upgrade"
                },
                {
                    cost: 349,
                    title: "1TB SSD Upgrade"
                }
            ],
            title: "MacBook Pro 16-inch",
            variants: [
                {
                    cost: 500,
                    title: "Ultra edition"
                },
                {
                    cost: 1000,
                    title: "Tim Cook edition"
                }
            ]
        }
    ];
}

function addFeature(container, idx, feature) {
    let labelElement = document.createElement("label");
    let checkbox = document.createElement("input");

    labelElement.setAttribute("for", "feature-" + idx);
    labelElement.textContent = feature.title;

    checkbox.type = "checkbox";
    checkbox.name = "feature-" + idx;
    checkbox.id = "feature-" + idx;

    container.appendChild(checkbox);
    container.appendChild(labelElement);
}

function displayFeatures(productIndex) {
    let featureContainer = document.getElementById("features");
    let selectedProduct = fetchProducts()[productIndex];
    featureContainer.innerHTML = "";

    if (selectedProduct.features) {
        selectedProduct.features.forEach(function (feature, idx) {
            addFeature(featureContainer, idx, feature);
        });
    }
}

function addVariant(container, idx, variant) {
    let optionElement = document.createElement("option");
    optionElement.value = (
        Number.isNaN(idx)
        ? ""
        : idx
    );
    optionElement.textContent = variant.title;

    container.appendChild(optionElement);
}

function displayVariants(productIndex) {
    let variantContainer = document.getElementById("variants");
    let selectElement = document.createElement("select");
    let selectedProduct = fetchProducts()[productIndex];
    variantContainer.innerHTML = "";

    if (selectedProduct.variants) {
        selectElement.name = "variant";

        addVariant(selectElement, NaN, {
            cost: 0,
            title: "-"
        });

        selectedProduct.variants.forEach(function (variant, idx) {
            addVariant(selectElement, idx, variant);
        });

        variantContainer.appendChild(selectElement);
    }
}

function handleProductSelection(event) {
    let productIndex = parseInt(event.target.value, 10);
    displayVariants(productIndex);
    displayFeatures(productIndex);
}

function addProduct(container, idx, product) {
    let labelElement = document.createElement("label");
    let radioButton = document.createElement("input");

    labelElement.setAttribute("for", "product-" + idx);
    labelElement.textContent = product.title;

    radioButton.type = "radio";
    radioButton.name = "product";
    radioButton.value = idx;
    radioButton.id = "product-" + idx;

    container.appendChild(radioButton);
    container.appendChild(labelElement);
}

function isPositiveInteger(value) {
    return /^\d+$/.test(value);
}

function computeTotal() {
    let selectedProductElem = document.querySelector(
        "#products input[type=radio]:checked"
    );
    let totalPrice;
    let sel;
    let selectedVariant;
    let quantity;
    let output;
    let selectedFeatures = document.querySelectorAll(
        "#features input[type=checkbox]"
    );

    if (!selectedProductElem) {
        return;
    }

    let selectedProduct = fetchProducts()[
        parseInt(selectedProductElem.value, 10)
    ];
    totalPrice = selectedProduct.cost;

    sel = document.querySelector("#variants select")?.value;
    selectedVariant = parseInt(sel, 10);
    quantity = document.getElementById("quantity").value;

    if (selectedProduct.variants) {
        if (sel && !Number.isNaN(selectedVariant)) {
            totalPrice += selectedProduct.variants[selectedVariant].cost;
        }
    }

    if (selectedProduct.features) {
        selectedFeatures.forEach(function (feature, idx) {
            if (feature.checked) {
                totalPrice += selectedProduct.features[idx].cost;
            }
        });
    }

    if (!isPositiveInteger(quantity)) {
        output = "Please enter a valid positive integer!";
    } else {
        output = totalPrice * parseInt(quantity, 10);
    }

    document.getElementById("output").textContent = output;
}

window.addEventListener("DOMContentLoaded", function () {
    let productContainer = document.getElementById("products");

    fetchProducts().forEach(function (product, idx) {
        addProduct(productContainer, idx, product);
    });

    productContainer.addEventListener("change", handleProductSelection);
    document.querySelector("form").addEventListener("input", computeTotal);
});

