// // fetch data from server using fetch api

// // function  getData(){
// //     fetch("http://localhost:3000/products")
// //     .then(response => response.json())
// //     .then(data => console.log(data))
// // }
// // getData(); 
 
// console.log("--------------");

// // using async and  await  function getData(){
// // async function getData(){
// //     try{
// //         const response = await fetch("http://localhost:3000/products");
// //         const data = await response.json();
// //         console.log(data);
// //         }
// //         catch(err){
// //             console.warn(err);
// //         }
// // }    
// // getData();

// console.log("--------------------------------------------------------------------------");


// const container = document.createElement("div");
// const url = "http://localhost:3000/products";

// // Getting data from inputs
// const titleInput = document.getElementById("title");
// const priceInput = document.getElementById("price");
// const descriptionInput = document.getElementById("description");
// const imageInput = document.getElementById("image");
// const idInput = document.getElementById("id");
// const btn = document.getElementById("btn");

// btn.addEventListener("click", async function () {
//     if (titleInput.value === '' || priceInput.value === '' || descriptionInput.value === '' || imageInput.value === '') {
//         alert("Enter Data Properly");
//     } else {
//         let method = idInput.value ? "PUT" : "POST";
//         const mainurl = (method === "PUT") ? ${url}/${idInput.value} : url;

//         try {
//             let response = await fetch(mainurl, {
//                 method,
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     "title": titleInput.value,
//                     "price": priceInput.value,
//                     "description": descriptionInput.value,
//                     "image": imageInput.value
//                 })
//             });

//             if (!response.ok) throw new Error("Failed to update/add data");

//             const result = await response.json();  // Ensure JSON response is handled properly
//             alert(method === "PUT" ? " Data Updated Successfully!" : " Data Added Successfully!");
//             getData(); // Refresh UI
//         } catch (err) {
//             console.warn("Error in updating data:", err);
//         }
//     }
// });
// // Async function to fetch data
// async function getData() {
//     try {
//         const response = await fetch(url);
//         if (response.ok) {
//             const data = await response.json();
//             displayData(data);
//         }
//     } catch (err) {
//         console.warn(err);
//     }
// }

// // Function to display data
// function displayData(products) {
//     container.innerHTML = ""; // Clear existing content
//     products.forEach(obj => {
//         let item = document.createElement("div");

//         item.innerHTML = `
//             <img class="image" src="${obj.image}" alt="Product Image">
//             <p>${obj.title}</p>
//             <p>₹ ${obj.price}</p>
//             <p>${obj.description}</p>

//             <button class="btn btn-danger" onclick="deleteData('${obj.id}')">Delete</button>
//             <button class="btn btn-primary" onclick="updateData('${obj.id}')">Update</button>
//         `;
//         // loader.remove();
//         container.appendChild(item);
//     });

//     document.body.appendChild(container);
// }

// // Update data using onclick button
// async function updateData(id) {
//     try {
//         const response = await fetch(${url}/${id});
//         if (!response.ok) throw new Error("Failed to fetch data");

//         const obj = await response.json();
//         titleInput.value = obj.title;
//         priceInput.value = obj.price;
//         descriptionInput.value = obj.description;
//         imageInput.value = obj.image;
//         idInput.value = obj.id;

//         // Scroll smoothly to the top
//         window.scroll({
//             top: 0,
//             behavior: "smooth"
//         });

//     } catch (err) {
//         console.warn("Error updating data:", err);
//     }
// }

// // Async function to delete data
// async function deleteData(id) {
//     try {
//         const response = await fetch(${url}/${id}, { method: "DELETE" });
//         if (!response.ok) throw new Error("Failed to delete data");

//         alert("❌ Data Deleted Successfully!");
//         getData(); // Refresh UI
//     } catch (err) {
//         console.warn("Error deleting data:", err);
//     }
// }

// // Fetch data initially
// getData();



console.log("-----------------------------------------------------------------------------")

const container = document.createElement("div");
document.body.appendChild(container); // Ensure container is part of the DOM

const url = "http://localhost:3000/products";

// Getting data from inputs
const titleInput = document.getElementById("title");
const priceInput = document.getElementById("price");
const descriptionInput = document.getElementById("description");
const imageInput = document.getElementById("image");
const idInput = document.getElementById("id");
const btn = document.getElementById("btn");

btn.addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent form submission if inside a form

    if (!titleInput.value || !priceInput.value || !descriptionInput.value || !imageInput.value) {
        alert("Enter Data Properly");
        return;
    }

    let method = idInput.value ? "PUT" : "POST";
    const mainurl = method === "PUT" ? `${url}/${idInput.value}` : url;

    try {
        let response = await fetch(mainurl, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: titleInput.value,
                price: priceInput.value,
                description: descriptionInput.value,
                image: imageInput.value
            })
        });

        if (!response.ok) throw new Error("Failed to update/add data");

        alert(method === "PUT" ? "✅ Data Updated Successfully!" : "✅ Data Added Successfully!");
        getData(); // Refresh UI
    } catch (err) {
        console.warn("Error in updating data:", err);
    }
});

// Async function to fetch data
async function getData() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        displayData(data);
    } catch (err) {
        console.warn("Error fetching data:", err);
    }
}

// Function to display data
function displayData(products) {
    container.innerHTML = ""; // Clear existing content

    products.forEach(obj => {
        let item = document.createElement("div");

        item.innerHTML = `
            <img class="image" src="${obj.image}" alt="Product Image">
            <p>${obj.title}</p>
            <p>₹ ${obj.price}</p>
            <p>${obj.description}</p>

            <button class="btn btn-danger" onclick="deleteData('${obj.id}')">Delete</button>
            <button class="btn btn-primary" onclick="updateData('${obj.id}')">Update</button>
        `;

        container.appendChild(item);
    });
}

// Update data using onclick button
async function updateData(id) {
    try {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch data");

        const obj = await response.json();
        titleInput.value = obj.title;
        priceInput.value = obj.price;
        descriptionInput.value = obj.description;
        imageInput.value = obj.image;
        idInput.value = obj.id;

        // Scroll smoothly to the top
        window.scroll({
            top: 0,
            behavior: "smooth"
        });

    } catch (err) {
        console.warn("Error updating data:", err);
    }
}

// Async function to delete data
async function deleteData(id) {
    try {
        const response = await fetch(`${url}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete data");

        alert("❌ Data Deleted Successfully!");
        getData(); // Refresh UI
    } catch (err) {
        console.warn("Error deleting data:", err);
    }
}

// Fetch data initially
getData();
