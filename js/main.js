// ==============================
// LOAD HEADER
// ==============================

function loadHeader() {
  fetch("components/header.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Không thể tải header.html: ${response.status}`);
      }

      return response.text();
    })
    .then((data) => {
      const header = document.getElementById("header");

      if (!header) {
        return;
      }

      // Chèn header vào trang
      header.innerHTML = data;

      // Header đã xuất hiện rồi
      // mới chạy các chức năng liên quan
      initMobileMenu();
      initActiveMenu();
    })
    .catch((error) => {
      console.error("Lỗi load Header:", error);
    });
}

// ==============================
// MOBILE SIDEBAR MENU
// ==============================

function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");

  const navbar = document.getElementById("navbar");

  const menuOverlay = document.getElementById("menuOverlay");

  // Nếu thiếu bất kỳ phần tử nào thì dừng
  if (!mobileMenuBtn || !navbar || !menuOverlay) {
    console.error("Không tìm thấy phần tử Mobile Menu");

    return;
  }

  // MỞ MENU
  function openMenu() {
    navbar.classList.add("show");
    menuOverlay.classList.add("show");

    const icon = mobileMenuBtn.querySelector("i");

    if (icon) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    }
  }

  // ĐÓNG MENU
  function closeMenu() {
    navbar.classList.remove("show");
    menuOverlay.classList.remove("show");

    const icon = mobileMenuBtn.querySelector("i");

    if (icon) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  }

  // CLICK HAMBURGER
  mobileMenuBtn.addEventListener("click", () => {
    if (navbar.classList.contains("show")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // CLICK OVERLAY ĐỂ ĐÓNG MENU
  menuOverlay.addEventListener("click", closeMenu);
}

// ==============================
// ACTIVE MENU
// ==============================

function initActiveMenu() {
  let currentPage = window.location.pathname.split("/").pop();

  // Khi đang ở trang chủ /
  if (!currentPage) {
    currentPage = "index.html";
  }

  const navLinks = document.querySelectorAll(".nav-list a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    // Xóa active cũ
    link.classList.remove("active");

    // Thêm active cho trang hiện tại
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
}

// ==============================
// BACK TO TOP
// ==============================

function initBackToTop() {
  const backToTop = document.getElementById("backToTop");

  // Có trang không có nút Back To Top
  if (!backToTop) {
    return;
  }

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
      behavior: "smooth",
    });
  });
}

// ==============================
// QUOTE FORM
// ==============================

function initQuoteForm() {
  const quoteForm = document.getElementById("quoteForm");

  // Trang không có form thì bỏ qua
  if (!quoteForm) {
    return;
  }

  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name")?.value;

    const email = document.getElementById("email")?.value;

    const service = document.getElementById("service")?.value;

    if (!name || !email || !service) {
      alert("Please fill in all information.");

      return;
    }

    alert(`Thank you ${name}! Your quote request has been received.`);

    quoteForm.reset();
  });
}

// ==============================
// START WEBSITE
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  // Load Header trước
  loadHeader();

  // Các chức năng riêng của từng trang
  initBackToTop();
  initQuoteForm();
});
