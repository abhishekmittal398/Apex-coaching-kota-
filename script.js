// Apex Career Academy - Interactive Landing Page Logic

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC COUNTDOWN TIMER (Closes at Sunday midnight)
  initCountdownTimer();

  // 2. INTERACTIVE SCHOLARSHIP CALCULATOR
  initScholarshipCalculator();

  // 3. LEAD CAPTURE FORM SUBMISSION & PIXEL SIMULATION
  initLeadForm();

  // 4. FAQ ACCORDION LOGIC
  initFaqAccordion();
});

/* ==========================================================
   1. COUNTDOWN TIMER LOGIC
   ========================================================== */
function initCountdownTimer() {
  const daysEl = document.getElementById('timer-days');
  const hoursEl = document.getElementById('timer-hours');
  const minutesEl = document.getElementById('timer-minutes');
  const secondsEl = document.getElementById('timer-seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  // Set target date 48 hours from now
  let targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 2);
  targetDate.setHours(23, 59, 59, 999);

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
      // Reset timer if expired
      targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 2);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================
   2. INTERACTIVE SCHOLARSHIP CALCULATOR
   ========================================================== */
function initScholarshipCalculator() {
  const slider = document.getElementById('marks-range');
  const percentageDisplay = document.getElementById('slider-percentage');
  const scholarshipDisplay = document.getElementById('scholarship-reward');
  const feeSavingText = document.getElementById('fee-saving-text');

  if (!slider || !percentageDisplay || !scholarshipDisplay || !feeSavingText) return;

  function calculateScholarship(marks) {
    let scholarship = 25;
    let savings = '₹35,000';

    if (marks >= 95) {
      scholarship = 90;
      savings = '₹1,25,000 (Super Scholar)';
    } else if (marks >= 90) {
      scholarship = 75;
      savings = '₹1,05,000';
    } else if (marks >= 80) {
      scholarship = 50;
      savings = '₹70,000';
    } else if (marks >= 70) {
      scholarship = 35;
      savings = '₹50,000';
    } else {
      scholarship = 25;
      savings = '₹35,000';
    }

    percentageDisplay.textContent = `${marks}%`;
    scholarshipDisplay.textContent = `${scholarship}% Scholarship`;
    feeSavingText.textContent = `Approx ${savings} Direct Fee Discount`;
  }

  // Event listener for real-time slider updates
  slider.addEventListener('input', (e) => {
    calculateScholarship(Number(e.target.value));
  });

  // Initial calculation
  calculateScholarship(Number(slider.value));
}

/* ==========================================================
   3. LEAD CAPTURE FORM, DATA STORAGE & META/GA4 PIXEL TRACKING
   ========================================================== */
function initLeadForm() {
  const form = document.getElementById('lead-form');
  const modal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalStudentName = document.getElementById('modal-student-name');
  const modalRefNo = document.getElementById('modal-ref-no');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Disable button & show spinner state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-2"></i> Registering...`;

    // Extract form data
    const leadData = {
      name: document.getElementById('student_name').value.trim(),
      phone: document.getElementById('student_phone').value.trim(),
      targetExam: document.getElementById('target_exam').value,
      currentClass: document.getElementById('current_class').value,
      city: document.getElementById('student_city').value.trim(),
      timestamp: new Date().toISOString(),
      refNo: 'APX-' + Math.floor(100000 + Math.random() * 900000)
    };

    // 1. Simulate saving to LocalStorage (Demonstrable in Interview)
    const existingLeads = JSON.parse(localStorage.getItem('apex_leads') || '[]');
    existingLeads.push(leadData);
    localStorage.setItem('apex_leads', JSON.stringify(existingLeads));

    // 2. Simulate Digital Marketing Analytics Event Trigger
    simulateAnalyticsTracking(leadData);

    // Simulate 700ms network latency for realism
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      // Update Modal content
      modalStudentName.textContent = leadData.name;
      modalRefNo.textContent = leadData.refNo;

      // Show Success Modal
      modal.classList.remove('hidden');

      // Reset form fields
      form.reset();
    }, 700);
  });

  // Close modal logic
  closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}

// Digital Marketing Agency Feature: Demonstrates knowledge of Analytics & Pixels
function simulateAnalyticsTracking(leadData) {
  console.log(
    '%c[Meta Pixel Simulated Event] %cLead',
    'color: #1877f2; font-weight: bold;',
    'color: #10b981; font-weight: bold;',
    {
      content_name: 'NEET & JEE Admission Form',
      currency: 'INR',
      value: 1000,
      user_data: {
        name: leadData.name,
        phone: '+91' + leadData.phone,
        exam: leadData.targetExam,
        city: leadData.city
      }
    }
  );

  console.log(
    '%c[GA4 Simulated Event] %cgenerate_lead',
    'color: #ea580c; font-weight: bold;',
    'color: #2563eb; font-weight: bold;',
    {
      event_category: 'Admissions',
      event_label: leadData.targetExam,
      value: 1
    }
  );
}

/* ==========================================================
   4. FAQ ACCORDION LOGIC
   ========================================================== */
function initFaqAccordion() {
  const toggles = document.querySelectorAll('.faq-toggle');

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const icon = toggle.querySelector('i');
      const isHidden = content.classList.contains('hidden');

      // Close all other accordions
      document.querySelectorAll('.faq-content').forEach((item) => {
        item.classList.add('hidden');
      });
      document.querySelectorAll('.faq-toggle i').forEach((item) => {
        item.classList.remove('rotate-180');
      });

      // Toggle current accordion
      if (isHidden) {
        content.classList.remove('hidden');
        icon.classList.add('rotate-180');
      }
    });
  });
}
