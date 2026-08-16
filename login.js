const phoneInput = document.getElementById('phoneInput');
const sendOtpBtn = document.getElementById('sendOtpBtn');
const whatsappLink = document.getElementById('whatsappLink');
const otpStep = document.getElementById('otpStep');
const verifyOtpBtn = document.getElementById('verifyOtpBtn');
const resendOtpBtn = document.getElementById('resendOtpBtn');
const otpInput = document.getElementById('otpInput');
const statusMessage = document.getElementById('statusMessage');

const STORAGE_KEY = 'ravisir-login';

function randomOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function updateStatus(text, isError = false) {
  statusMessage.textContent = text;
  statusMessage.style.color = isError ? '#dc2626' : '#0f766e';
}

function buildWhatsAppLink(phone, otp) {
  const supportNumber = '919876543210';
  const message = `Hello Ravi Sir,%20I%20need%20my%20WhatsApp%20OTP%20for%20login.%20My%20number%20is%20${phone}.%20Please%20send%20the%20code.`;
  return `https://wa.me/${supportNumber}?text=${message}`;
}

function saveLoginState(phone) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ phone, loggedIn: true }));
}

function getLoginState() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
}

function showLoggedInState(phone) {
  const panel = document.querySelector('.login-panel');
  panel.innerHTML = `
    <h1>Welcome Back</h1>
    <p>You are logged in as <strong>+91 ${phone}</strong>.</p>
    <div class="login-actions">
      <button id="logoutBtn" class="btn btn-primary">Logout</button>
      <a href="index.html" class="btn btn-secondary">Go to Home</a>
    </div>
  `;
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  });
}

function startOtpFlow() {
  const phone = phoneInput.value.trim();
  if (!/^[6-9]\d{9}$/.test(phone)) {
    updateStatus('Please enter a valid 10-digit Indian mobile number.', true);
    return;
  }

  const otp = randomOtp();
  sessionStorage.setItem('loginOtp', otp);
  sessionStorage.setItem('loginPhone', phone);
  updateStatus(`OTP generated. Use code ${otp} or open WhatsApp to request support.`, false);
  otpStep.style.display = 'block';
  whatsappLink.href = buildWhatsAppLink(phone, otp);
  whatsappLink.textContent = 'Open WhatsApp to Request OTP';
  whatsappLink.style.display = 'inline-flex';
}

function verifyOtp() {
  const expectedOtp = sessionStorage.getItem('loginOtp');
  const expectedPhone = sessionStorage.getItem('loginPhone');
  const enteredOtp = otpInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!expectedOtp || !expectedPhone || phone !== expectedPhone) {
    updateStatus('Please send the OTP again before verifying.', true);
    return;
  }

  if (enteredOtp !== expectedOtp) {
    updateStatus('OTP does not match. Please try again.', true);
    return;
  }

  saveLoginState(phone);
  showLoggedInState(phone);
}

function resendOtp() {
  startOtpFlow();
}

function initLoginPage() {
  const loginState = getLoginState();

  if (loginState && loginState.loggedIn) {
    showLoggedInState(loginState.phone);
    return;
  }

  whatsappLink.style.display = 'none';
  sendOtpBtn.addEventListener('click', startOtpFlow);
  verifyOtpBtn.addEventListener('click', verifyOtp);
  resendOtpBtn.addEventListener('click', resendOtp);
  updateStatus('Enter your phone number and start the WhatsApp OTP login process.');
}

initLoginPage();
