document.getElementById('btn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Example credentials (replace with your actual validation logic)
    // var validEmail = 'admin@example.com';
    // var validPassword = 'password';

    if (email === 'lakshayrahal@gmail.com' && password === 'Lakshay') {
        // Successful login action with delay
        setTimeout(function() {
            alert('Login successful! Redirecting...'); // Example alert, replace with actual action
            // You can redirect to another page using window.location.href = 'url';
            window.location.href = 'index.html'; // Replace with your actual page URL
        }, 1000); // 3000 milliseconds = 3 seconds
    } else {
        // Display error message
        alert( 'Invalid email or password. Please try again.');
    }
});

const wrapper=document.querySelector('.wrapper');
// const loginLink=document.querySelector('.login-link');
// const registerLink=document.querySelector('.register-link');
const btnPopup=document.querySelector('.btnLogin-popup');
const iconclose=document.querySelector('.icon-close');
//  registerLink.addEventListener('click',()=>{
//     wrapper.classList.add('active');

// });
// loginLink.addEventListener('click',()=>{
//     wrapper.classList.remove('active');

// });
btnPopup.addEventListener('click',()=>{
    wrapper.classList.add('active-popup');
});
iconclose.addEventListener('click',()=>{
    wrapper.classList.remove('active-popup');
});
document.addEventListener('DOMContentLoaded', function() {
    const btnReadMore = document.querySelectorAll('.btnread');

    btnReadMore.forEach(btn => {
        btn.addEventListener('click', function() {
            // Hide all .s21 elements
            document.querySelectorAll('.s21').forEach(elem => {
                elem.style.display = 'none';
                
                
            });
            document.querySelectorAll('.lak').forEach(elem => {
                elem.style.display = 'block';
                    
            });
            
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const btnReadMore = document.querySelectorAll('.back');

    btnReadMore.forEach(btn => {
        btn.addEventListener('click', function() {
            // Hide all .s21 elements
            document.querySelectorAll('.s21').forEach(elem => {
                elem.style.display = 'block';
                
                
            });
            document.querySelectorAll('.lak').forEach(elem => {
                elem.style.display = 'none';
                    
            });
            
        });
    });
});
 




