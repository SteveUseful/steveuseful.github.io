// Sidebar Toggle
const toggleBtn = document.querySelector(".toggle-btn");
const sidebar = document.querySelector(".sidebar");
const content = document.querySelector(".content");

toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    content.classList.toggle("collapsed");
});

// Live Search Functionality
const searchInput = document.querySelector(".search-bar input");
const suggestionsList = document.querySelector(".suggestions");

const suggestions = [
    "Building an LLM",
    "Generative AI",
    "Configuring Redis with ConfigMaps",
    "API Gateway Integration",
    "GraphQL vs REST",
    "Scaling Python Apps"
];

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    suggestionsList.innerHTML = "";

    if (value) {
        const filtered = suggestions.filter((item) =>
            item.toLowerCase().includes(value)
        );
        filtered.forEach((suggestion) => {
            const li = document.createElement("li");
            li.textContent = suggestion;
            li.addEventListener("click", () => {
                searchInput.value = suggestion;
                suggestionsList.innerHTML = "";
            });
            suggestionsList.appendChild(li);
        });
    }
});
