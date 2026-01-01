document.addEventListener('DOMContentLoaded', () =>{
    const dogBtn = document.getElementById('generate-dog-button');
    const dogContainer = document.getElementById('dog-output');

    async function getDogImage() {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        dogContainer.innerHTML = ""; // Clear previous content
        const img = document.createElement('img');
        img.src = data.message;
        img.alt = "Random Dog";
        dogContainer.appendChild(img);
    }

    dogBtn.addEventListener('click', getDogImage);
    
});