const userDetails = {
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 0,
    tableNo : Math.floor(Math.random() * 20) + 1 
};

localStorage.removeItem("PersonalDetails");
console.log("delete");

const form = document.getElementById('bookingForm');
const tableBTn = document.getElementById('tableBtn');
const subBtn = document.getElementById('subBtn');

tableBTn.addEventListener('click', () => {
    const name = form.elements['name'].value;
    const guests = form.elements['guests'].value;
    const date = form.elements['date'].value;
    const time = form.elements['time'].value;

    if (!name || !guests || !date || !time) {
        alert("Please fill out all required fields before proceeding.");
        return;
    }

    document.getElementById('userName').textContent = `Name: ${name}`;
    document.getElementById('userGuest').textContent = `Guests: ${guests}`;
    document.getElementById('userTable').textContent = `Table booked at: ${time} on ${date}`;
});

subBtn.addEventListener('click', () => {
    form.requestSubmit(); 
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    userDetails.name = form.elements['name'].value;
    userDetails.email = form.elements['email'].value;
    userDetails.phone = form.elements['phone'].value;
    userDetails.date = form.elements['date'].value;
    userDetails.time = form.elements['time'].value;
    userDetails.guests = form.elements['guests'].value;

    const hasEmptyValue = Object.values(userDetails).some(value => {
        return value === '' || value === null || value === undefined;
    });

    if (hasEmptyValue) {
        alert('Please fill in all fields');
        return;
    } else {
        localStorage.setItem("PersonalDetails", JSON.stringify(userDetails));
        localStorage.removeItem("cart");

        location.href = 'home.html';
    }
});
