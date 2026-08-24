// ==============================
// MOBILE MENU
// ==============================

// ==============================
// MOBILE SIDEBAR MENU
// ==============================

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navbar = document.getElementById("navbar");
const menuOverlay = document.getElementById("menuOverlay");

function openMenu() {

    navbar.classList.add("show");
    menuOverlay.classList.add("show");

    const icon = mobileMenuBtn.querySelector("i");

    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");

}


function closeMenu() {

    navbar.classList.remove("show");
    menuOverlay.classList.remove("show");

    const icon = mobileMenuBtn.querySelector("i");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");

}


if (mobileMenuBtn && navbar && menuOverlay) {

    mobileMenuBtn.addEventListener("click", () => {

        if (navbar.classList.contains("show")) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    // Bấm vào vùng tối bên ngoài để đóng menu
    menuOverlay.addEventListener("click", closeMenu);

}


// ==============================
// BACK TO TOP
// ==============================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


// ==============================
// QUOTE FORM
// ==============================

const quoteForm = document.getElementById("quoteForm");

if (quoteForm) {

    quoteForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const service = document.getElementById("service").value;

        if (!name || !email || !service) {

            alert("Please fill in all information.");

            return;

        }

        alert(
            `Thank you ${name}! Your quote request has been received.`
        );

        quoteForm.reset();

    });

}


// ==============================
// ACTIVE MENU
// ==============================

const currentPage = window.location.pathname.split("/").pop();

const navLinks = document.querySelectorAll(".nav-list a");

navLinks.forEach((link) => {

    const href = link.getAttribute("href");

    if (href === currentPage) {

        document
            .querySelectorAll(".nav-list a")
            .forEach((item) => {
                item.classList.remove("active");
            });

        link.classList.add("active");

    }

});