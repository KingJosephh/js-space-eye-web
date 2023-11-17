window.addEventListener('DOMContentLoaded', (event) => {
    const button1 = document.getElementById("button1");
    const button2 = document.getElementById("button2");
    const button3 = document.getElementById("button3");
    const button4 = document.getElementById("button4");

    function showPage(pageId) {
        const allPages = document.querySelectorAll(".content-to-hide-owner");
        allPages.forEach((page) => {
            page.style.display = "none";
        });

        const selectedPage = document.getElementById(pageId);
        if (selectedPage) {
            selectedPage.style.display = "block";
        }
    }

    button1.addEventListener("click", () => {
        showPage("page1");
    });

    button2.addEventListener("click", () => {
        showPage("page2");
    });

    button3.addEventListener("click", () => {
        showPage("page3");
    });

    button4.addEventListener("click", () => {
        showPage("page4");
    });

});

window.addEventListener('DOMContentLoaded', (event) => {
    const button5 = document.getElementById("button5");

    function showPage2(pageId) {
        const onePages = document.querySelectorAll(".text-center");
        onePages.forEach((page) => {
            page.style.display = "none";
        });

        const selectedOnePage = document.getElementById(pageId);
        if (selectedOnePage) {
            selectedOnePage.style.display = "block";
        }
    }

    button5.addEventListener("click", () => {
        showPage2("page5");
    })
})
