var enteredPins = [];

document.addEventListener('DOMContentLoaded', function () {
    const pinInput = document.getElementById('pin');
    const pinMessage = document.querySelector('.pin-message');
    const subscribeBtn = document.querySelector('button[type="submit"]');

    pinInput.addEventListener('input', function () {
        const pin = pinInput.value.trim();

        // Check if input is a 4-digit number
        if (pin.length === 4 && /^[0-9]{4}$/.test(pin)) {
            if (enteredPins.includes(pin)) {
                pinMessage.textContent = 'This PIN has already been used. Please try a different one.';
                pinMessage.style.color = 'red';
                pinInput.style.borderColor = 'red';
            } else if (enteredPins.length < 2) {
                enteredPins.push(pin);
                pinMessage.textContent = 'Please try a different PIN.';
                pinMessage.style.color = 'orange';
                pinInput.style.borderColor = 'orange';
                pinInput.value = '';
            } else if (enteredPins.length === 2) {
                enteredPins.push(pin);
                pinMessage.textContent = 'Approved!';
                pinMessage.style.color = 'green';
                pinInput.style.borderColor = 'green';
                pinInput.disabled = true;
                subscribeBtn.disabled = false;
            }
        } else {
            pinMessage.textContent = 'Please enter a valid 4-digit number.';
            pinMessage.style.color = 'red';
            pinInput.style.borderColor = 'red';
        }
    });
});

document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const educationLevel = document.getElementById('educationLevel').value;

    try {
        console.log("this ran successfully")
        const response = await fetch('http://localhost:3000/addParticipant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: fullname,
                email: email,
                educationLevel: educationLevel,
                pins: enteredPins
            }),
        });

        if (response.ok) {
            alert('Signup successful!');
            document.getElementById('signupForm').reset();
            resetPins();
        } else {
            alert('Failed to submit data.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting data.');
    }
});

function resetPins() {
    enteredPins = [];
    document.getElementById('pin').disabled = false;
    document.querySelector('button[type="submit"]').disabled = true;
}
