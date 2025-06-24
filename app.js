document.addEventListener('DOMContentLoaded', () => {
  const navList = document.getElementById('navbar__list');
  const sections = document.querySelectorAll('section');
  const header = document.querySelector('nav');
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.textContent = '↑ Top';
  scrollTopBtn.id = 'scrollToTop';
  document.body.appendChild(scrollTopBtn);

  let scrollTimer = null;

  // --- Build Dynamic Nav ---
  sections.forEach(section => {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.href = `#${section.id}`;
    a.textContent = section.dataset.nav;
    a.classList.add('menu__link');

    a.addEventListener('click', function (e) {
      e.preventDefault();
      section.scrollIntoView({ behavior: 'smooth' });
    });

    li.appendChild(a);
    navList.appendChild(li);
  });

  // --- Add Collapsible Button to Sections ---
  sections.forEach(section => {
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle Content';
    toggleBtn.className = 'collapse-btn';

    const content = section.querySelector('p'); // Simplified: assumes <p> holds content
    toggleBtn.addEventListener('click', () => {
      if (content.style.display === 'none') {
        content.style.display = 'block';
      } else {
        content.style.display = 'none';
      }
    });

    section.insertBefore(toggleBtn, content);
  });

  // --- Set Active Section and Nav on Scroll ---
  const setActiveSection = () => {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const navLink = document.querySelector(`a[href="#${section.id}"]`);

      if (rect.top <= 150 && rect.bottom >= 150) {
        section.classList.add('your-active-class');
        navLink.classList.add('active');
      } else {
        section.classList.remove('your-active-class');
        navLink.classList.remove('active');
      }
    });
  };

  // --- Hide Navbar on Inactivity ---
  const hideNavbarOnIdle = () => {
    header.style.display = 'block'; // Always show on scroll
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      header.style.display = 'none';
    }, 2000);
  };

  // --- Show Scroll to Top Button ---
  const toggleScrollTopButton = () => {
    if (window.scrollY > window.innerHeight) {
      scrollTopBtn.style.display = 'block';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  };

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Scroll Listener ---
  window.addEventListener('scroll', () => {
    setActiveSection();
    hideNavbarOnIdle();
    toggleScrollTopButton();
  });
});
