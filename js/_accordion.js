const accordionButtons = document.querySelectorAll(".accordion-button");

accordionButtons.forEach(button => {
    button.addEventListener("click", () => {
        accordionButtons.forEach(btn => {
            if (btn !== button) {
                btn.classList.remove("active");
                const panel = btn.nextElementSibling;
                panel.style.maxHeight = null;
            }
        });

        button.classList.toggle("active");
        const panel = button.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
});