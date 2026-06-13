// Google Apps Script URL
const FORM_SUBMISSION_URL = 'https://script.google.com/macros/s/AKfycbySawnCoMdM60Hl3uvHmYvfmxmgUxx7DfJX-4Ep94UavlSpq-MI72g5hD9YMDMkk8G5_g/exec';

var selected = 1;
var courses = ['Data Analysis with AI', 'Data Science with AI', 'Digital Marketing with AI'];
var colors = [
  { opt: 'sel', chk: 'checked' },
  { opt: 'sel-teal', chk: 'checked-teal' },
  { opt: 'sel-purple', chk: 'checked-purple' }
];

function setCourseValue() {
  var input = document.getElementById('fcourse');
  if (input) {
    input.value = courses[selected - 1];
  }
}

function selectCourse(n) {
  for (var i = 1; i <= 3; i++) {
    document.getElementById('co' + i).className = 'course-opt';
    document.getElementById('chk' + i).className = 'co-check';
  }

  selected = n;

  document.getElementById('co' + n).className =
    'course-opt ' + colors[n - 1].opt;

  document.getElementById('chk' + n).className =
    'co-check ' + colors[n - 1].chk;

  // Hidden field update
  if (n == 1) {
    document.getElementById('fcourse').value = 'Data Analysis with AI';
  } else if (n == 2) {
    document.getElementById('fcourse').value = 'Data Science with AI';
  } else if (n == 3) {
    document.getElementById('fcourse').value = 'Digital Marketing with AI';
  }
}
function validate(id, errId, check) {
  var el = document.getElementById(id);
  var err = document.getElementById(errId);
  if (!check(el.value)) {
    el.className = el.tagName === 'INPUT' ? 'err' : 'err';
    el.style.border = '1.5px solid #A32D2D';
    err.className = 'err-msg show';
    return false;
  }
  el.style.border = '';
  err.className = 'err-msg';
  return true;
}

function submitForm() {
  // Set the form action dynamically from the stored URL
  document.getElementById('enrollForm').action = FORM_SUBMISSION_URL;


  var ok = true;
  ok = validate('fname', 'fname-err', function(v){ return v.trim().length > 1; }) && ok;
  ok = validate('fphone', 'fphone-err', function(v){ return /^\d{10}$/.test(v.trim().replace(/\s/g,'')); }) && ok;
  var alt = document.getElementById('faltphone').value.trim().replace(/\s/g,'');
  if (alt && !/^\d{10}$/.test(alt)) {
    document.getElementById('faltphone').className = 'err';
    document.getElementById('faltphone').style.border = '1.5px solid #A32D2D';
    document.getElementById('faltphone-err').className = 'err-msg show';
    ok = false;
  } else {
    document.getElementById('faltphone').style.border = '';
    document.getElementById('faltphone-err').className = 'err-msg';
  }
  ok = validate('flocation', 'flocation-err', function(v){ return v !== ''; }) && ok;
  ok = validate('fexp', 'fexp-err', function(v){ return v !== ''; }) && ok;
  ok = validate('fctc', 'fctc-err', function(v){ return v !== ''; }) && ok;
  ok = validate('findustry', 'findustry-err', function(v){ return v !== ''; }) && ok;
  if (!ok) return;

  var phone = '+91 ' + document.getElementById('fphone').value.trim();
  document.getElementById('sName').textContent = document.getElementById('fname').value.trim();
  document.getElementById('sPhone').textContent = phone;
  document.getElementById('sPhoneD').textContent = phone;
  document.getElementById('sLoc').textContent = document.getElementById('flocation').value;
  document.getElementById('sExp').textContent = document.getElementById('fexp').value;
  document.getElementById('sInd').textContent = document.getElementById('findustry').value;
  document.getElementById('sCtc').textContent = document.getElementById('fctc').value;
  document.getElementById('sCourse').textContent = courses[selected - 1];

  // setCourseValue();
  // if (selected === 1) {
  //   document.getElementById('enrollForm').submit();
  // }

  // document.getElementById('formCard').style.display = 'none';
  // document.getElementById('successCard').classList.add('show'); 

  setCourseValue();

// Data Science & Digital Marketing
if (selected === 2 || selected === 3) {
  document.getElementById('batchPopup').style.display = 'flex';
  return;
}

// Data Analysis
document.getElementById('enrollForm').submit();

document.getElementById('formCard').style.display = 'none';
document.getElementById('successCard').classList.add('show');




}

function closePopup() {
  document.getElementById('batchPopup').style.display = 'none';
};

(function() {
  var toggle = document.getElementById('mobileNavToggle');
  var siteNav = document.getElementById('siteNav');
  var coursesDropdown = document.getElementById('coursesDropdown');
  var coursesToggle = document.getElementById('coursesToggle');

  if (!toggle || !siteNav) return;

  toggle.addEventListener('click', function() {
    var isOpen = siteNav.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggle.textContent = isOpen ? '×' : '☰';
  });

  if (coursesToggle && coursesDropdown) {
    coursesToggle.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      var isOpen = coursesDropdown.classList.toggle('open');
      coursesToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  document.addEventListener('click', function(event) {
    if (!siteNav.contains(event.target) && siteNav.classList.contains('nav-open')) {
      siteNav.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }
  });
})();
