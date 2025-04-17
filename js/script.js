document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.bottom-nav li');
    const sections = document.querySelectorAll('main section');
    const themeToggle = document.getElementById('theme-toggle');
    const manualThemeToggle = document.getElementById('manual-theme-toggle');
    const darkModeStylesheet = document.querySelector('link[href="css/dark-mode.css"]');

    // Function to show a specific section and hide others
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

    // Event listeners for bottom navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const sectionId = this.dataset.section;
            showSection(sectionId);
        });
    });

    // Initially show the home section
    showSection('home');

    // Function to set the theme
    function setTheme(theme) {
        if (theme === 'dark') {
            darkModeStylesheet.disabled = false;
            localStorage.setItem('theme', 'dark');
            if (manualThemeToggle) manualThemeToggle.checked = true;
        } else {
            darkModeStylesheet.disabled = true;
            localStorage.setItem('theme', 'light');
            if (manualThemeToggle) manualThemeToggle.checked = false;
        }
    }

    // Theme Toggle Button (Top Right)
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = localStorage.getItem('theme');
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    // Manual Dark Mode Toggle (Settings Section)
    if (manualThemeToggle) {
        manualThemeToggle.addEventListener('change', () => {
            setTheme(manualThemeToggle.checked ? 'dark' : 'light');
        });
    }

    // Check for saved theme preference on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    } else {
        setTheme('light'); // Explicitly set light mode as default if no preference
    }
});