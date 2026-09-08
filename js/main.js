// ==============================
// LOAD HEADER
// ==============================

function loadHeader() {

    fetch("./components/header.html")
        .then(response => {

            if (!response.ok) {
                throw new Error("Không thể tải header.html");
            }

            return response.text();

        })
        .then(data => {

            const header = document.getElementById("header");

            if (!header) {
                console.error("Không tìm thấy header");
                return;
            }

            header.innerHTML = data;

            // Header đã load xong
            initMobileMenu();
            initActiveMenu();

        })
        .catch(error => {

            console.error("HEADER ERROR:", error);

        });
}


// ==============================
// LOAD FOOTER
// ==============================

function loadFooter() {

    fetch("./components/footer.html")
        .then(response => {

            if (!response.ok) {
                throw new Error("Không thể tải footer");
            }

            return response.text();

        })
        .then(data => {

            const footer = document.getElementById("footer");

            if (!footer) {
                console.error("Không tìm thấy footer");
                return;
            }

            footer.innerHTML = data;

        })
        .catch(error => {

            console.error("FOOTER ERROR:", error);

        });
}


// ==============================
// MOBILE MENU
// ==============================

function initMobileMenu() {

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const navbar =
        document.getElementById("navbar");

    const menuOverlay =
        document.getElementById("menuOverlay");


    if (!mobileMenuBtn || !navbar || !menuOverlay) {

        console.error("Không tìm thấy mobile menu");

        return;

    }


    mobileMenuBtn.addEventListener("click", () => {

        navbar.classList.toggle("show");
        menuOverlay.classList.toggle("show");


        const icon =
            mobileMenuBtn.querySelector("i");


        if (navbar.classList.contains("show")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    menuOverlay.addEventListener("click", () => {

        navbar.classList.remove("show");
        menuOverlay.classList.remove("show");

        const icon =
            mobileMenuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

}


// ==============================
// ACTIVE MENU
// ==============================

function initActiveMenu() {

    let currentPage =
        window.location.pathname.split("/").pop();


    if (!currentPage) {
        currentPage = "index.html";
    }


    const navLinks =
        document.querySelectorAll(".nav-list a");


    navLinks.forEach(link => {

        link.classList.remove("active");


        const href =
            link.getAttribute("href");


        if (href === currentPage) {

            link.classList.add("active");

        }

    });

}


// ==============================
// BACK TO TOP
// ==============================

function initBackToTop() {

    const backToTop =
        document.getElementById("backToTop");


    if (!backToTop) return;


    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}


// ==============================
// START
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    loadHeader();

    loadFooter();

    initBackToTop();

});

// CONTACT
const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    fullname: document.getElementById("fullname").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    company: document.getElementById("company").value,
    industry: document.getElementById("industry").value,
    service: document.getElementById("service").value,
    message: document.getElementById("message").value,
  };

  const response = await fetch("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const result = await response.json();

  document.getElementById("formMessage").textContent = result.message;
});