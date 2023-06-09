const mobileMenu = document.getElementById('mobile-menu');
const navbarMenu = document.querySelector('.navbar__menu');

mobileMenu.addEventListener('click', function () {
  mobileMenu.classList.toggle('active');
  navbarMenu.classList.toggle('active');
});

// Close the mobile menu when a menu item is clicked
const navbarLinks = document.querySelectorAll('.navbar__links');

navbarLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    mobileMenu.classList.remove('active');
    navbarMenu.classList.remove('active');
  });
});

