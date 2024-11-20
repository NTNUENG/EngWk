// Accordion Toggle Script
const accordionButtons = document.querySelectorAll(".accordion-button");

accordionButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Close any currently open accordion
        accordionButtons.forEach(btn => {
            if (btn !== button) {
                btn.classList.remove("active");
                const panel = btn.nextElementSibling;
                panel.style.maxHeight = null;
            }
        });

        // Toggle the clicked accordion
        button.classList.toggle("active");
        const panel = button.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
});