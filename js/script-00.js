document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const manualThemeToggle = document.getElementById('manual-theme-toggle');

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
});