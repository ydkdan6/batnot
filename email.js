document.addEventListener('DOMContentLoaded', function() {
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const company = document.getElementById('company').value;
    const industry = document.getElementById('industry').value;
    const dropdown = document.getElementById('country').value;
    const message = document.getElementById('comments').value;
    
    // Construct the mailto link
    const mailtoLink = `mailto:donaldnequette479@gmail.com?subject=Contact Form Submission&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone Number: ${phone}\nCompany: ${company}\nIndustry: ${industry}\nCountry: ${dropdown}\n\nMessage:\n${message}`
    )}`;
    
    // Redirect to the mailto link
    window.location.href = mailtoLink;
});
});
