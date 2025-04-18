document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const manualThemeToggle = document.getElementById('manual-theme-toggle');
    const navLinks = document.querySelectorAll('.bottom-nav li');
    const sections = document.querySelectorAll('main section');

    // Firebase form elements (assuming you've added these to your index.html)
    const registrationForm = document.getElementById('registration-form');
    const signinForm = document.getElementById('signin-form');

    // --- Existing Theme Toggling Logic ---
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
            if (manualThemeToggle) manualThemeToggle.checked = body.classList.contains('dark-mode');
        });
    }

    if (manualThemeToggle) {
        manualThemeToggle.addEventListener('change', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (manualThemeToggle) manualThemeToggle.checked = true;
    }

    // --- Existing Section Navigation Logic ---
    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active-section');
        });
        document.getElementById(sectionId).classList.add('active-section');

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const sectionId = this.dataset.section;
            showSection(sectionId);
        });
    });

    showSection('home'); // Initial section

    // --- Firebase User Registration Logic (NEW) ---
    if (registrationForm) {
        registrationForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const nameInput = registrationForm.querySelector('#name');
            const emailInput = registrationForm.querySelector('#email');
            const passwordInput = registrationForm.querySelector('#password');

            if (nameInput && emailInput && passwordInput) {
                const name = nameInput.value;
                const email = emailInput.value;
                const password = passwordInput.value;

                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        return firebase.firestore().collection('users').doc(user.uid).set({
                            name: name,
                            email: email
                        });
                    })
                    .then(() => {
                        console.log('Registration successful!');
                        // Optionally redirect or update UI
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.error('Registration failed:', errorCode, errorMessage);
                        // Display error to user in UI
                    });
            } else {
                console.error('Registration form fields not found.');
            }
        });
    }

    // --- Firebase User Sign-in Logic (NEW) ---
    if (signinForm) {
        signinForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const emailInput = signinForm.querySelector('#email');
            const passwordInput = signinForm.querySelector('#password');

            if (emailInput && passwordInput) {
                const email = emailInput.value;
                const password = passwordInput.value;

                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        console.log('Sign-in successful!', user);
                        // Optionally redirect or update UI
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.error('Sign-in failed:', errorCode, errorMessage);
                        // Display error to user in UI
                    });
            } else {
                console.error('Sign-in form fields not found.');
            }
        });
    }

    // --- Firebase Auth State Listener (NEW) ---
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('User is signed in:', user.uid);
            // Update UI to show logged-in state (e.g., hide sign-in/register forms, show app content)
        } else {
            console.log('User is signed out');
            // Update UI to show logged-out state (e.g., show sign-in/register forms)
        }
    });
});
