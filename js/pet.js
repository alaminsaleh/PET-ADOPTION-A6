// create the button 
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then((res) => res.json())
        .then(data => displayCategories(data.categories))
        .catch((error) => console.log(error));
};


// Function to filter pets by category and show a loading animation
const filterPetsByCategory = (category) => {
    // Get the card container element
    const cardContainer = document.getElementById('cards');
    // Show loading animation
    cardContainer.innerHTML = `
        <div class="col-span-12 flex justify-center items-center min-h-[200px]">
            <span class="loading loading-bars loading-md"></span>
        </div>
    `;

    // Simulate a delay (2 seconds) before showing the filtered pets
    setTimeout(() => {
        fetch('https://openapi.programming-hero.com/api/peddy/pets')
            .then((res) => res.json())
            .then(data => {
                // Filter pets by category
                const filteredPets = data.pets.filter(pet => pet.category === category);

                // Display filtered pets after the loading animation
                displayCard(filteredPets);
            })
            .catch((error) => console.log(error));
    }, 1000); // 2-second delay to simulate loading
};


// // Sort function by price (descending)
// const sortByPriceDescending = (pets) => {
//     return pets.sort((a, b) => b.price - a.price);  // Sort in descending order
// };

// // Event listener for the 'Sort By Price' button
// document.getElementById('sort-by-price').addEventListener('click', () => {
//     fetch('https://openapi.programming-hero.com/api/peddy/pets')
//         .then((res) => res.json())
//         .then(data => {
//             const sortedPets = sortByPriceDescending(data.pets); // Sort pets by price
//             displayCard(sortedPets);  // Display sorted pets
//         })
//         .catch((error) => console.log(error));
// });



// Add an event listener to the 'Sort By Price' button
document.getElementById('sort-by-price').addEventListener('click', () => {
    // Show loading animation
    const cardContainer = document.getElementById('cards');
    cardContainer.innerHTML = `
        <div class="col-span-12 flex justify-center items-center min-h-[200px]">
            <span class="loading loading-bars loading-md"></span>
        </div>
    `;

    // Simulate a delay (2 seconds) for the sorting process
    setTimeout(() => {
        // Fetch the pets again (or use the already fetched data)
        fetch('https://openapi.programming-hero.com/api/peddy/pets')
            .then(res => res.json())
            .then(data => {
                // Sort the pets by price in descending order
                const sortedPets = data.pets.sort((a, b) => b.price - a.price); 

                // Display the sorted cards after the loading animation
                displayCard(sortedPets);
            })
            .catch(error => console.log(error));
    }, 1000); // Simulating a 2-second delay
});

// The 'displayCard' function remains the same, as it is used to render the sorted cards.




// card shows
const loadCard = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then((res) => res.json())
        .then(data => displayCard(data.pets))  // Pass pets data to displayCard function
        .catch((error) => console.log(error));
};


// details Modal ❌❌❌❌
const loadDetails = async (details) => {
    console.log(details);
    const uri = `https://openapi.programming-hero.com/api/peddy/category/${details}`;
    const res = await fetch(uri);
    const data = await res.json();
    console.log(data);
    displayDetails(data.data[0]);
    // console.log(data.data[0]);
}

const displayDetails = (detail) => {
    console.log(detail);
    const detailContainer = document.getElementById('modal-content');
    document.getElementById('customModal').showModal();
    detailContainer.innerHTML = `
    <img class="w-full h-auto rounded-lg shadow-md mb-4" src="${detail.image}"/>
    <h2 class="text-lg font-bold mb-2 text-gray-900">${detail.pet_name}</h2>
   <div class="mt-2 flex gap-4 justify-between">
    <div>
    
    <p class="text-sm text-gray-500 flex items-center gap-2"><i class="fa fa-calendar-alt "></i> <span>Birth: ${detail.date_of_birth ? detail.date_of_birth : 'Not found'}</span></p>
    <p class="text-sm text-gray-500 flex items-center gap-2"><i class="fa fa-venus "></i> <span>Gender: ${detail.gender ? detail.gender : 'Not found'}</span></p>
    <p class="text-sm text-gray-500 flex items-center gap-2"> <i class="fa fa-check-circle"></i> <span>Vaccinated Status: ${detail.vaccinated_status ? detail.vaccinated_status : 'Not found'}</span></p>
    </div>
    <div>
    <p class="text-sm text-gray-500 flex items-center gap-2"><i class="fa fa-th-large "></i> <span>Breed: ${detail.breed ? detail.breed : 'Not found'}</span></p>
    <p class="text-sm text-gray-500 flex items-center gap-2"> <i class="fa fa-dollar-sign "></i><span>Price: ${detail.price ? `${detail.price}$` : 'Not found'}</span></p>
    </div>
   </div>
     <P class="  mt-2 font-bold text-xl">Detailed Information:</p>
     <p class="mt-1 italic text-gray-600">"${detail.pet_details}" </p>
     `
}








// Adopt Modal ❌❌❌❌✅✅✅

// Function to open the Adopt Modal
const showAdoptModal = () => {
    const adoptModal = document.getElementById('adoptModal');
    const adoptContent = document.getElementById('adopt-modal-content');

    // Inject the adopt modal content dynamically with countdown placeholder
    adoptContent.innerHTML = `
        <div class="flex flex-col justify-center items-center">
        <img class="" src="https://img.icons8.com/?size=80&id=JDJpJPFVUvFU&format=png" />
        <h2>Congratulates!</h2>
        <p>Adoption Process is Starting for your Pet.</p>
        <p id="countdown">3</p>
        </div>
    `;

    // Show the modal
    adoptModal.showModal();

    // Countdown logic: 3 to 1
    let countdown = 3;
    const countdownElement = document.getElementById('countdown'); // Get the countdown element

    const countdownInterval = setInterval(() => {
        countdown--;
        countdownElement.textContent = `${countdown}`; // Update the countdown text

        // When countdown reaches 0, stop the interval and close the modal
        if (countdown === 0) {
            clearInterval(countdownInterval); // Stop the countdown interval
            adoptModal.close(); // Automatically close the modal
        }
    }, 1000); // Update the countdown every 1 second
};

// ❌❌❌❌❌❌❌❌❌❌❌








// Add the likedPet function
const likedPet = (id) => {
    const noLiked = document.getElementById('no-pet').classList.add('hidden'); // Hide the 'No favorite pet' message
    const likedPetContainer = document.getElementById('liked-pet');

    // Create a new div for the liked pet
    const div = document.createElement('div');
    div.innerHTML = `
        <img src="${id}" alt="Pet image" class="rounded-lg w-40 h-auto"/>
    `;
    likedPetContainer.appendChild(div); // Append the new pet image to the liked pet container
}


// Updated displayCard function
const displayCard = (pets) => {
    const cardContainer = document.getElementById('cards');
    cardContainer.innerHTML = ''; // Clear any existing cards

    if (pets.length == 0) {
        cardContainer.classList.remove("grid");
        cardContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
            <img src="./assests/error.webp" />
            <h2 class="text-center text-xl font-bold">No Content Here in this Category</h2>
        </div>`;
    } else {
        cardContainer.classList.add("grid");
    }

    pets.forEach((pet) => {
        // Create card container
        const card = document.createElement("div");
        card.classList = "border rounded-lg p-4";

        // Set card content
        card.innerHTML = `
        <img class="rounded-md h-[200px] w-full object-cover" src=${pet.image}>
        <div class="mb-4">
            <h2 class="text-lg font-semibold mb-1 mt-2">${pet.pet_name}</h2>
            <p class="text-sm flex items-center gap-2 mb-2"><i class="fa fa-th-large"></i><span>Breed: ${pet.breed ? pet.breed : 'Not found'}</span></p>
            <p class="text-sm flex items-center gap-2 mb-2"><i class="fa fa-calendar-alt"></i><span>Birth: ${pet.date_of_birth ? pet.date_of_birth : 'Not found'}</span></p>
            <p class="text-sm flex items-center gap-2 mb-2"><i class="fa fa-venus"></i><span>Gender: ${pet.gender ? pet.gender : 'Not found'}</span></p>
            <p class="text-sm flex items-center gap-2 mb-2"><i class="fa fa-dollar-sign"></i><span>Price: ${pet.price ? `${pet.price}$` : 'Not found'}</span></p>
        </div>

        <div class="flex justify-between items-center pt-2 md:gap-1 border-t border-gray-200">
            <!-- Updated thumbs-up button -->
            <button onclick="likedPet('${pet.image}')" class="flex items-center gap-2 px-2 lg:px-5 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
          <img id="thumbs-up" class="w-6 h-6" src="https://img.icons8.com/?size=48&id=U6uSXVbuA1xU&format=png" />
            </button>

            <button onclick="showAdoptModal()" class="flex items-center md:px-3 gap-2 px-5 py-2 text-teal-500 bg-gray-100 rounded-lg hover:bg-gray-200">
                <h1 class="font-bold">Adopt</h1>
            </button>
            <button onclick="loadDetails('${pet.category}')" class="flex items-center md:px-3 gap-2 px-5 py-2 text-teal-500 bg-gray-100 rounded-lg hover:bg-teal-600">
                <span class="font-bold">Details</span>
            </button>
        </div>
        `;

        // Append the card to the container
        cardContainer.append(card);
    });
};


const displayCategories = (data) => {
    const categoryContainer = document.getElementById('categories');
    
    // Track the currently active button
    let activeButton = null;
  
    data.forEach(item => {
        // Create button container
        const buttonContainer = document.createElement("div");
        
        // Add Tailwind classes for normal and hover state
        buttonContainer.classList = "flex items-center gap-2 lg:gap-3 md:px-5 py-3 px-8 lg:px-8 lg:py-4 border border-[#3fafa5] rounded-lg hover:rounded-full hover:border-[#3fafa5] hover:bg-[#e7f9f7] transition-colors ease-in-out duration-300";

        // Set innerHTML with image and category text
        buttonContainer.innerHTML = `<button id="btn-${item.id}">
        <span class="flex justify-center items-center gap-1 md:gap-3 md:px-4 lg:gap-2 lg:px-6 lg:w-[150px] md:w-[100px] sm:w-[80px]"><img src="${item.category_icon}" class="w-8 h-8">
            ${item.category} </span>
        </button>`;
  
        // Add click event listener to each category button
        buttonContainer.addEventListener('click', () => {
            // Filter pets based on category
            filterPetsByCategory(item.category); 
  
            // Remove active state from the previous active button
            if (activeButton) {
                activeButton.classList.remove('bg-[#e7f9f7]', 'rounded-full');
                activeButton.classList.add('rounded-lg'); // Reset to original shape
            }
  
            // Add active state to the clicked button (make it rounded-full)
            buttonContainer.classList.add('bg-[#e7f9f7]', 'rounded-full');
            buttonContainer.classList.remove('rounded-lg'); // Ensure it doesn't have rounded corners

            // Update the currently active button
            activeButton = buttonContainer;
        });
  
        // Add button to category container
        categoryContainer.append(buttonContainer);
    });
};




// call the function
loadCategories();
loadCard();
