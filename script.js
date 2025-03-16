fetch("luxdrive_site_data_full.json")
.then(function(response) {
    if(!response.ok) {
        throw new Error("Error : json couldn't be loaded.")
    }
    return response.json();
})

.then(function(data){

    let carsContainer = document.getElementById("cars");


for (let i = 0; i < data.cars.length; i++) {
    let car = data.cars[i];
    let carKey = generateKey(car.name, data.pagesContent.carDetails);
    let carDetail = data.pagesContent.carDetails[carKey] || null;


let newDiv = document.createElement("div");
newDiv.classList.add("car-item");

let name = document.createElement("h2");
name.textContent = car.name;
newDiv.appendChild(name);

let img = document.createElement("img");
img.src = car.image;
img.alt = "This is a photo of a super car"
newDiv.appendChild(img);

let price = document.createElement("h3");
price.textContent = car.price + "$";
newDiv.appendChild(price);

let brand = data.brands.find(function(b) {
    return b.id === car.brandId;
});

let brandName = brand.name;

let brandElement = document.createElement("h4");
brandElement.textContent = brandName;
newDiv.appendChild(brandElement);


let button = document.createElement("button");
button.classList.add("btn", "btn-primary");
button.textContent = "Voir details"
newDiv.appendChild(button);

let detailsDiv = document.createElement("div");
detailsDiv.classList.add("details");
newDiv.appendChild(detailsDiv);

function generateKey(name, carDetails) {
    for (let key in carDetails) {
        if (carDetails[key].title === name) {
            return key;
        }
    }
    return "unknown-name";
}

let intro = document.createElement("p");
intro.textContent = carDetail.introduction;
detailsDiv.appendChild(intro);

let specsTitle = document.createElement("h4");
specsTitle.textContent = "Specifications :";
detailsDiv.appendChild(specsTitle);

let specsList = document.createElement("ul");
for (let spec in carDetail.specs) {
    let specItem = document.createElement("li");
    specItem.textContent = `${spec}: ${carDetail.specs[spec]}`;
    specsList.appendChild(specItem);
}
detailsDiv.appendChild(specsList);

let fullDesc = document.createElement("p");
fullDesc.textContent = carDetail.descriptionLongue;
detailsDiv.appendChild(fullDesc);

button.addEventListener("click", function() {
    if (detailsDiv.classList.contains("active")) {
        detailsDiv.classList.remove("active");
    } else {
        detailsDiv.classList.add("active");
    }
})

carsContainer.appendChild(newDiv);
}
})



