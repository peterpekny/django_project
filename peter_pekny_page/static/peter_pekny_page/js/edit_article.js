document.addEventListener("DOMContentLoaded", function () {
    const editBtn = document.getElementById("edit-btn");
    const editForm = document.getElementById("edit-form");
    const articleContent = document.getElementById("article-content");
    const cancelBtn = document.getElementById("cancel-btn");

    if (editBtn) {
        editBtn.addEventListener("click", function () {
            articleContent.style.display = "none"; // Skryť obsah článku
            editForm.style.display = "block"; // Zobraziť formulár
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener("click", function () {
            editForm.style.display = "none"; // Skryť formulár
            articleContent.style.display = "block"; // Zobraziť obsah článku
        });
    }

    document.getElementById("article-edit-form").addEventListener("submit", function (e) {
        e.preventDefault(); // Zabránime reloadu stránky

        const formData = new FormData(this);

        fetch("{% url 'article_edit' article.id %}", {
            method: "POST",
            body: formData,
            headers: {
                "X-CSRFToken": formData.get("csrfmiddlewaretoken"),
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    location.reload(); // Reload stránky po úspešnom uložení
                } else {
                    alert("Nepodarilo sa uložiť zmeny.");
                }
            })
            .catch(error => console.error("Chyba:", error));
    });
});
