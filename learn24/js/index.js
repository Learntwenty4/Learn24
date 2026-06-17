
    const siteNav = document.getElementById('siteNav'); const mobileNavToggle = document.getElementById('mobileNavToggle'); const coursesDropdown = document.getElementById('coursesDropdown'); const coursesToggle = document.getElementById('coursesToggle');
    mobileNavToggle.addEventListener('click', () => { const isOpen = siteNav.classList.toggle('nav-open'); mobileNavToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false'); mobileNavToggle.textContent = isOpen ? '×' : '☰'; });
    coursesToggle.addEventListener('click', (event) => { event.preventDefault(); event.stopPropagation(); const isOpen = coursesDropdown.classList.toggle('open'); coursesToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false'); });
    document.addEventListener('click', (event) => { if (!siteNav.contains(event.target) && siteNav.classList.contains('nav-open')) { siteNav.classList.remove('nav-open'); mobileNavToggle.setAttribute('aria-expanded', 'false'); mobileNavToggle.textContent = '☰'; } });

     const ENROLL_URL = 'https://script.google.com/macros/s/AKfycbySawnCoMdM60Hl3uvHmYvfmxmgUxx7DfJX-4Ep94UavlSpq-MI72g5hD9YMDMkk8G5_g/exec';
    const COURSES = ['Data Analysis with AI', 'Data Science with AI', 'Digital Marketing with AI'];
    var selectedCourse = 1;

    function lockBody(lock) { document.body.style.overflow = lock ? 'hidden' : ''; }

    function openEnrollModal(e) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      var qn = document.getElementById('quickName');
      var qp = document.getElementById('quickPhone');
      if (qn && qn.value.trim()) document.getElementById('fname').value = qn.value.trim();
      if (qp && qp.value.trim()) document.getElementById('fphone').value = qp.value.trim();

      document.getElementById('enrollForm').style.display = 'block';
      document.getElementById('enrollSuccess').classList.remove('show');
      selectEnrollCourse(1);

      document.getElementById('enrollModal').classList.add('show');
      lockBody(true);
      closeNav();
      setTimeout(function () { var f = document.getElementById('fname'); if (f && !f.value) f.focus(); }, 150);
    }

    function closeEnrollModal() {
      document.getElementById('enrollModal').classList.remove('show');
      lockBody(false);
    }

    function closeNav() {
      if (siteNav.classList.contains('nav-open')) {
        siteNav.classList.remove('nav-open');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        mobileNavToggle.textContent = '☰';
      }
    }

    function selectEnrollCourse(n) {
      if (n !== 1) { showBatchPopup(); return; }
      selectedCourse = 1;
      document.getElementById('co1').className = 'en-co selected';
      document.getElementById('co2').className = 'en-co disabled';
      document.getElementById('co3').className = 'en-co disabled';
      document.getElementById('fcourse').value = 'Data Analysis with AI';
    }

    function showBatchPopup() { document.getElementById('batchOverlay').classList.add('show'); }
    function closeBatchPopup() { document.getElementById('batchOverlay').classList.remove('show'); }

    function markErr(fieldId, show) {
      var field = document.getElementById(fieldId);
      var err = field ? field.querySelector('.en-err') : null;
      if (field) field.classList.toggle('is-err', show);
      if (err) err.classList.toggle('show', show);
    }
    function clearAllErr() {
      document.querySelectorAll('.en-field.is-err').forEach(el => el.classList.remove('is-err'));
      document.querySelectorAll('.en-err.show').forEach(el => el.classList.remove('show'));
    }

    function validateField(id, check) {
      return check(document.getElementById(id).value);
    }

    ['fphone', 'faltphone', 'quickPhone'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', function () { this.value = this.value.replace(/\D/g, '').slice(0, 10); });
    });

    function submitEnrollForm() {
      document.getElementById('enrollForm').action = ENROLL_URL;
      clearAllErr();

      var ok = true;
      if (!validateField('fname', v => /^[A-Za-z\s]{3,50}$/.test(v.trim()))) { markErr('fnameField', true); ok = false; }
      if (!validateField('fphone', v => /^[6-9]\d{9}$/.test(v.trim().replace(/\s/g, '')))) { markErr('fphoneField', true); ok = false; }
      var alt = document.getElementById('faltphone').value.trim().replace(/\s/g, '');
      if (alt && !/^\d{10}$/.test(alt)) { markErr('faltphoneField', true); ok = false; }
      if (!validateField('flocation', v => v !== '')) { markErr('flocationField', true); ok = false; }
      if (!validateField('fexp', v => v !== '')) { markErr('fexpField', true); ok = false; }
      if (!validateField('fctc', v => v !== '')) { markErr('fctcField', true); ok = false; }
      if (!validateField('findustry', v => v !== '')) { markErr('findustryField', true); ok = false; }

      if (!ok) {
        var first = document.querySelector('.en-field.is-err');
        if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      var phone = '+91 ' + document.getElementById('fphone').value.trim();
      document.getElementById('sName').textContent  = document.getElementById('fname').value.trim();
      document.getElementById('sPhone').textContent = phone;
      document.getElementById('sLoc').textContent   = document.getElementById('flocation').value;
      document.getElementById('sExp').textContent   = document.getElementById('fexp').value;
      document.getElementById('sInd').textContent   = document.getElementById('findustry').value;
      document.getElementById('sCtc').textContent   = document.getElementById('fctc').value;
      document.getElementById('sCourse').textContent = COURSES[selectedCourse - 1];

      document.getElementById('enrollForm').submit();

      document.getElementById('enrollForm').style.display = 'none';
      document.getElementById('enrollSuccess').classList.add('show');
    }

    var navBtn = document.getElementById('navEnrollBtn');
    if (navBtn) navBtn.addEventListener('click', function (e) { openEnrollModal(e); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeEnrollModal(); closeBatchPopup(); closeNav(); }
    });
