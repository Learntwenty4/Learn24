  
    /* ── Mobile Nav ── */
    const siteNav = document.getElementById('siteNav');
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const coursesDropdown = document.getElementById('coursesDropdown');
    const coursesToggle = document.getElementById('coursesToggle');

    mobileNavToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('nav-open');
      mobileNavToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileNavToggle.textContent = isOpen ? '×' : '☰';
    });

    coursesToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = coursesDropdown.classList.toggle('open');
      coursesToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
      if (!siteNav.contains(e.target) && siteNav.classList.contains('nav-open')) {
        siteNav.classList.remove('nav-open');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        mobileNavToggle.textContent = '☰';
      }
    });

    /* ── Filter Tabs ── */
    function filterCards(btn, course) {
      document.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tcard').forEach(card => {
        if (course === 'all' || card.dataset.course === course) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    }
 