// Select the pizza base and toppings
const baseImg = document.getElementById("base-img");
const toppings = document.querySelectorAll(".toppings img");

// Set up event listeners for the pizza base and toppings
baseImg.addEventListener("dragstart", dragStart);
baseImg.addEventListener("dragend", dragEnd);
toppings.forEach((topping) => {
    topping.addEventListener("dragstart", dragStart);
    topping.addEventListener("dragend", dragEnd);
});

// Set up event listeners for the pizza container
const pizzaContainer = document.querySelector(".pizza");
pizzaContainer.addEventListener("dragover", dragOver);
pizzaContainer.addEventListener("dragenter", dragEnter);
pizzaContainer.addEventListener("dragleave", dragLeave);
pizzaContainer.addEventListener("drop", dragDrop);

// Drag and drop functions
function dragStart() {
    this.classList.add("dragging");
}

function dragEnd() {
    this.classList.remove("dragging");
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add("hovered");
}

function dragLeave() {
    this.classList.remove("hovered");
}

function dragDrop() {
    const pizza = document.querySelector(".pizza");
    const ingredient = document.querySelector(".dragging");
    pizza.appendChild(ingredient);
    updatePizzaImage();
    this.classList.remove("hovered");
}

// Function to update the pizza image
function updatePizzaImage() {
    const pizzaImg = document.createElement("img");
    pizzaImg.src = baseImg.src;
    toppings.forEach((topping) => {
        if (topping.parentNode === document.querySelector(".pizza")) {
            pizzaImg.src = addToppingToPizza(pizzaImg.src, topping.src);
        }
    });
    pizzaContainer.innerHTML = "";
    pizzaContainer.appendChild(pizzaImg);
}

// Function to add a topping to the pizza image
function addToppingToPizza(pizzaImgSrc, toppingImgSrc) {
    const pizzaImg = new Image();
    pizzaImg.src = pizzaImgSrc;
    const toppingImg = new Image();
    toppingImg.src = toppingImgSrc;
    const canvas = document.createElement("canvas");
    canvas.width = pizzaImg.width;
    canvas.height = pizzaImg.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(pizzaImg, 0, 0);
    ctx.drawImage(toppingImg, 0, 0);
    return canvas.toDataURL();
}
