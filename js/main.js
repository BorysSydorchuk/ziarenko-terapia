document.addEventListener('DOMContentLoaded', function () {

  /* -------------------------------------------------------
     Restore scroll position after a language switch
  ------------------------------------------------------- */
  var savedScroll = sessionStorage.getItem('scrollPos');
  if (savedScroll !== null) {
    window.scrollTo({ top: parseInt(savedScroll, 10), left: 0, behavior: 'instant' });
    sessionStorage.removeItem('scrollPos');
  }

  var langSwitchLinks = document.querySelectorAll('.lang-switch-link');
  langSwitchLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      sessionStorage.setItem('scrollPos', window.scrollY);
    });
  });

  /* -------------------------------------------------------
     Sticky nav background after 80px scroll
  ------------------------------------------------------- */
  var header = document.getElementById('site-header');
  function updateHeaderState() {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  if (header) {
    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
  }

  /* -------------------------------------------------------
     Mobile hamburger menu
  ------------------------------------------------------- */
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('nav-mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.classList.toggle('open', !isOpen);
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* -------------------------------------------------------
     FAQ accordion
  ------------------------------------------------------- */
  var faqTriggers = document.querySelectorAll('.faq-trigger');
  faqTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var body = document.getElementById(trigger.getAttribute('aria-controls'));
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';

      faqTriggers.forEach(function (other) {
        if (other !== trigger) {
          other.setAttribute('aria-expanded', 'false');
          var otherBody = document.getElementById(other.getAttribute('aria-controls'));
          if (otherBody) otherBody.style.maxHeight = '0px';
        }
      });

      if (isOpen) {
        trigger.setAttribute('aria-expanded', 'false');
        body.style.maxHeight = '0px';
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = 'none';
        var h = body.scrollHeight;
        body.style.maxHeight = '0px';
        body.offsetHeight; // force reflow
        body.style.maxHeight = h + 'px';
      }
    });
  });

  /* -------------------------------------------------------
     Contact form (Web3Forms)
  ------------------------------------------------------- */
  var form = document.getElementById('contact-form');
  if (form) {
    var submitBtn = document.getElementById('form-submit-btn');
    var defaultBtnText = submitBtn ? submitBtn.textContent : '';
    var loadingBtnText = submitBtn ? submitBtn.getAttribute('data-loading-text') : '';
    var successMessage = document.getElementById('form-success');
    var errorMessage = document.getElementById('form-error');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (errorMessage) errorMessage.classList.remove('visible');
      submitBtn.disabled = true;
      submitBtn.textContent = loadingBtnText;

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(form)
      })
        .then(function (response) { return response.json(); })
        .then(function (data) {
          if (data.success) {
            form.classList.add('hidden');
            if (successMessage) successMessage.classList.add('visible');
          } else {
            throw new Error('Web3Forms error');
          }
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = defaultBtnText;
          if (errorMessage) errorMessage.classList.add('visible');
        });
    });
  }

  /* -------------------------------------------------------
     Email obfuscation
  ------------------------------------------------------- */
  var emailLink = document.getElementById('email-link');
  if (emailLink) {
    var u = 'p.liudmylasydorchuk';
    var d = 'gmail.com';
    emailLink.href = 'mailto:' + u + '@' + d;
    emailLink.textContent = u + '@' + d;
  }

  /* -------------------------------------------------------
     Privacy policy toggle
  ------------------------------------------------------- */
  var privacyToggle = document.getElementById('privacy-toggle');
  var privacyPolicy = document.getElementById('privacy-policy');
  if (privacyToggle && privacyPolicy) {
    privacyToggle.addEventListener('click', function (event) {
      event.preventDefault();
      var isOpen = privacyPolicy.classList.toggle('open');
      if (isOpen) {
        privacyPolicy.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  /* -------------------------------------------------------
     GDPR consent link inside the contact form:
     scroll to / reveal the privacy policy section
  ------------------------------------------------------- */
  var gdprLink = document.querySelector('a[href="#privacy-policy"]');
  if (gdprLink && gdprLink !== privacyToggle && privacyPolicy) {
    gdprLink.addEventListener('click', function (event) {
      event.preventDefault();
      privacyPolicy.classList.add('open');
      privacyPolicy.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

});
