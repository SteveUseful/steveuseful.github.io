document.addEventListener("DOMContentLoaded", () => {
    const languageButtons = document.querySelectorAll(".language-toggle .toggle-btn");
    const levelButtons = document.querySelectorAll(".level-toggle .toggle-btn");
    const codeBlocks = document.querySelectorAll("pre");

    let selectedLanguage = "python"; // Default language
    let selectedLevel = "beginner"; // Default level

    const updateCodeBlocks = () => {
        codeBlocks.forEach((block) => {
            const isLanguageMatch = block.dataset.language === selectedLanguage;
            const isLevelMatch = !block.dataset.level || block.dataset.level === selectedLevel;
            block.style.display = isLanguageMatch && isLevelMatch ? "block" : "none";
        });

        languageButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.language === selectedLanguage));
        levelButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.level === selectedLevel));
    };

    languageButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            selectedLanguage = btn.dataset.language;
            updateCodeBlocks();
        });
    });

    levelButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            selectedLevel = btn.dataset.level;
            updateCodeBlocks();
        });
    });

    updateCodeBlocks();
});

function copyToClipboard(button) {
    const codeBlock = button.previousElementSibling.textContent;
    navigator.clipboard.writeText(codeBlock).then(() => {
        button.textContent = "Copied!";
        setTimeout(() => {
            button.textContent = "Copy";
        }, 2000);
    });
}
