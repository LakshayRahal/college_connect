function return1() {
    window.location.href = 'main.html';
}

document.getElementById('homeid').addEventListener('click', return1);

document.addEventListener("DOMContentLoaded", function() {
    showSection('dashboard-section');
    loadPosts();
    loadCategories();
});

document.querySelectorAll('.flex123 a').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelectorAll('.flex123 a').forEach(function(el) {
            el.classList.remove('new-style');
        });
        this.classList.add('new-style');
    });
});

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

document.getElementById('add-category-btn').addEventListener('click', function() {
    showSection('bu-addcat');
});

document.getElementById('add-category-form').addEventListener('submit', function(event) {
    event.preventDefault();
    addCategory();
});

document.getElementById('add-subcategory-btn').addEventListener('click',function(){
    showSection('bu-addsubcat');
});

document.getElementById('add-subcategory-form').addEventListener('submit',function(event){
    event.preventDefault();
    addSubcategory();
});
function addSubcategory() {
   const categoryl=document.getElementById('category').value;
   const subcat=document.getElementById('Subcategory').value;
   const description=document.getElementById('descriptionsub').value;
   if( !subcat || !description){
    alert('please enter all values');
    return;
   }
   fetch('http://localhost:8080/api/subcategories',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify({category:categoryl,name:subcat,description:description})
   })
   .then(response=>{
    if(!response.ok){
        throw new Error('Network was not ok');
    }
    return response.json();
   })
   .then (()=>{
    loadSubcategories();
    showSection('subcategory-section')
   })
   .catch(error => {
    // Handle any errors that occurred during fetch or JSON parsing
    console.error('Error adding category:', error);
});

}




function addCategory() {
    // Get the value of the category input field
    const category = document.getElementById('category').value;

    // Get the value of the description textarea field
    const description = document.getElementById('description').value;

    // Validate fields before making the fetch request
    if (!category || !description) {
        // If either category or description is empty, display an alert
        alert('Please enter values for both category and description');
        return; // Exit function if fields are not filled
    }

    // Construct the fetch request to POST data to the API endpoint
    fetch('http://localhost:8080/api/categories', {
        method: 'POST', // HTTP POST method to send data to the server
        headers: {
            'Content-Type': 'application/json' // Specify JSON content type
        },
        // Convert JavaScript object to JSON string and send it as the request body
        body: JSON.stringify({ name: category, description: description })
    })
    .then(response => {
        // Handle response from the server
        if (!response.ok) {
            // If response is not successful (HTTP status not in the range 200-299)
            throw new Error('Network response was not ok');
        }
        // Parse the response body as JSON
        return response.json();
    })
    .then(() => {
        // After successfully adding the category, perform these actions:
        loadCategories(); // Reload categories after successful addition
        showSection('category-section'); // Show category section after submission
    })
    .catch(error => {
        // Handle any errors that occurred during fetch or JSON parsing
        console.error('Error adding category:', error);
    });
}

function loadSubcategories(){
    fetch('http://localhost:8080/api/subcategories')
    .then(response=>response.json())
    .then(subcategories=>{
        const subcategorylist=document.getElementById('subcategory-list');
        subcategorylist.innerHTML='';
        subcategories.forEach(subcategory=>{
            const subcategoryItem=document.createElement('tr');
            subcategoryItem.className='subcategory-item';
            subcategoryItem.innerHTML=`
            <td>${subcategory.category}</td>
            <td>${subcategory.Subcategory}</td>
            <td>${subcategory.description}</td>
            <td>
               < button onclick="editSubcategory(${subcategory.id})">Edit</button>
            <button onclick="deleteSubcategory(${subcategory.id})">Delete</button>
            </td>
     `;
     subcategorylist.appendChild(subcategoryItem);
    });
    })
    .catch(error => console.error('Error in loading Subcategories:',error));
    }


function loadCategories() {
    fetch('http://localhost:8080/api/categories')
        .then(response => response.json())
        .then(categories => {
            const categoryList = document.getElementById('category-list');
            categoryList.innerHTML = '';
            categories.forEach(category => {
                const categoryItem = document.createElement('tr');
                categoryItem.className = 'category-item'; // Assigning category-item class here
                categoryItem.innerHTML = `
                    <td>${category.name}</td>
                    <td>${category.description}</td>
                    <td>
                        <button onclick="editCategory(${category.id})">Edit</button>
                        <button onclick="deleteCategory(${category.id})">Delete</button>
                    </td>
                `;
                categoryList.appendChild(categoryItem);
            });
        })
        .catch(error => console.error('Error loading categories:', error));
}


function editSubcategory(){

}
function editCategory(id) {
    // Edit category functionality
}

function deleteCategory(id) {
    fetch(`http://localhost:8080/api/categories/${id}`, {  // Ensure the correct backend URL
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            loadCategories();
        } else {
            console.error('Error deleting category');
        }
    })
    .catch(error => console.error('Error deleting category:', error));
}
function deleteSubcategory(){
    fetch(`http://localhost:8080/api/subcategories/${id}`,{
        method:'DELETE'
    })
    .then(response =>{
        if(response.ok){
            loadSubcategories();
        }
        else{
            console.error('Error in deleteing Subcategories');
        }
    })
    .catch(error=>console.error('Error in deleting Subcategory:',error));
}
// document.getElementById('add-subcategory-btn').addEventListener('click', addSubcategory);


document.getElementById('add-post-btn').addEventListener('click', function() {
    showSection('bu-addpost');
});

document.getElementById('postborder').addEventListener('submit', function(event) {
    event.preventDefault();
    addPosts();
});
function addPosts() {
    const postTitle = document.getElementById('PostTitle').value;
    const category = document.getElementById('categoryPost').value;
    const subcategory = document.getElementById('SubcategoryPost').value;
    const description = document.getElementById('descriptionPost').value;
    const photo = document.getElementById('photo').files[0];

    if (!postTitle || !category || !subcategory || !description || !photo) {
        alert('Please enter values for all fields');
        return;
    }

    let formData = new FormData();
    formData.append('PostTitle', postTitle);
    formData.append('categoryPost', category);
    formData.append('SubcategoryPost', subcategory);
    formData.append('descriptionPost', description);
    formData.append('photo', photo);

    fetch('http://localhost:8080/api/posts', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(() => {
        console.log('Post added successfully');
        loadPosts();
    })
    .catch(error => {
        console.error('Error adding post:', error);
    });
}

function loadPosts() {
    fetch('http://localhost:8080/api/posts')
        .then(response => response.json())
        .then(posts => {
            const postList = document.getElementById('post-list');
            postList.innerHTML = '';

            posts.forEach(post => {
                const postItem = document.createElement('div');
                postItem.className = 'post-item';
                postItem.innerHTML = `
                    <div class="post-content">
                        <img src="http://localhost:8080/images/${post.photo}" alt="Post Image">
                        <div>
                            <h3>${post.title}</h3>
                            <p>${post.content}</p>
                        </div>
                    </div>
                    <div class="post-actions">
                        <button onclick="editPost(${post.id})">Edit</button>
                        <button onclick="deletePost(${post.id})">Delete</button>
                    </div>
                `;
                postList.appendChild(postItem);
            });
        })
        .catch(error => {
            console.error('Error loading posts:', error);
        });
}


function editPost(postId) {
    // Edit post functionality
}

function deletePost(postId) {
    fetch(`http://localhost:8080/api/posts/${postId}`, {  // Ensure the correct backend URL
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            loadPosts();
        } else {
            console.error('Error deleting post');
        }
    })
    .catch(error => console.error('Error deleting post:', error));
}
