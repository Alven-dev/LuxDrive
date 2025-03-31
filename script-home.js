fetch("luxdrive_site_data_full.json")
.then(function(response) {
    if(!response.ok) {
        throw new Error("Error : json couldn't be loaded.")
    }
    return response.json();
})

.then(function(data) {

    // BANNER //

    let heroTitle = data.pagesContent.Accueil.heroBanner.title;
    let heroDesc = data.pagesContent.Accueil.heroBanner.subtitle;
    let cta = data.pagesContent.Accueil.heroBanner.cta;
    let heroDiv = document.getElementById("hero");

    let titleElement = document.createElement("h2");
    let descElement = document.createElement("p");
    let ctaElement = document.createElement("a");
    titleElement.textContent = heroTitle;
    descElement.textContent = heroDesc;
    ctaElement.text = cta;

    ctaElement.href = "LuxDrive/catalogue.html"
    ctaElement.classList.add("btn", "btn-primary", "btn-lg");

    heroDiv.appendChild(titleElement);
    heroDiv.appendChild(descElement);
    heroDiv.appendChild(ctaElement);


    const stats = data.pagesContent.Accueil.stats;

    stats.forEach(function(stat) {
        let targetDiv = null;

        if (stat.label.includes("Chevaux")) {
            targetDiv = document.getElementById("hp");
        } else if (stat.label.includes("Vitesse")) {
            targetDiv = document.getElementById("max");
        } else if (stat.label.includes("Clients")) {
            targetDiv = document.getElementById("rate");
        }

        if (targetDiv) {
            let valueElement = document.createElement("h2");
            valueElement.classList.add("display-4");
            valueElement.textContent = stat.value;

            let labelElement = document.createElement("p");
            labelElement.textContent = stat.label;

            targetDiv.appendChild(valueElement);
            targetDiv.appendChild(labelElement);
        }
    });

    // TESTIMONIALS //

    const testimonials = data.testimonials;

    const testimonialDivs = [
        document.getElementById("test-one"),
        document.getElementById("test-two"),
        document.getElementById("test-three")
    ];

    testimonials.forEach(function(testimonial, index) {
        if (index < testimonialDivs.length) {
            let targetDiv = testimonialDivs[index];

            let nameElement = document.createElement("h5");
            nameElement.classList.add("text-end")
            nameElement.textContent = testimonial.name;

            let noteElement = document.createElement("p");
            noteElement.innerHTML = "⭐️".repeat(testimonial.note);

            let messageElement = document.createElement("p");
            messageElement.textContent = testimonial.message;

            targetDiv.appendChild(nameElement);
            targetDiv.appendChild(noteElement);
            targetDiv.appendChild(messageElement);
        }
    })

})