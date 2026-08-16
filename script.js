const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.15 }
);

function initAuthModal() {
  if (document.getElementById('authModal')) return;

  document.body.insertAdjacentHTML('beforeend', `
    <div class="auth-modal-overlay" id="authModal" aria-hidden="true">
      <div class="auth-modal-backdrop" data-close-auth></div>
      <div class="auth-modal-card" role="dialog" aria-modal="true" aria-labelledby="authTitle">
        <button class="auth-close" type="button" aria-label="Close authentication dialog" data-close-auth>×</button>
        <div class="auth-modal-head">
          <div class="auth-logo" aria-hidden="true">✦</div>
          <p class="eyebrow auth-kicker">Secure access</p>
          <h2 id="authTitle">Welcome back</h2>
          <p id="authSubtitle">Sign in to continue to your learning dashboard.</p>
        </div>
        <div class="auth-switcher" role="tablist" aria-label="Authentication modes">
          <button type="button" class="auth-switch-btn is-active" data-auth-view="login">Login</button>
          <button type="button" class="auth-switch-btn" data-auth-view="register">Register</button>
          <button type="button" class="auth-switch-btn" data-auth-view="otp">WhatsApp OTP</button>
          <button type="button" class="auth-switch-btn" data-auth-view="forgot">Forgot</button>
        </div>
        <div class="auth-view-panel is-active" data-auth-view-panel="login">
          <form class="auth-form" data-auth-form="login">
            <button type="button" class="auth-social-btn">Continue with Google</button>
            <div class="auth-divider"><span>or continue with email</span></div>
            <div class="auth-field">
              <label for="loginEmail">Email address</label>
              <input id="loginEmail" name="loginEmail" type="email" placeholder="you@example.com" required />
              <p class="auth-field-hint"></p>
            </div>
            <div class="auth-field">
              <label for="loginPassword">Password</label>
              <input id="loginPassword" name="loginPassword" type="password" placeholder="Enter your password" required />
              <p class="auth-field-hint"></p>
            </div>
            <div class="auth-row">
              <label class="auth-check"><input id="rememberMe" name="rememberMe" type="checkbox" /><span>Remember me</span></label>
              <button type="button" class="auth-inline-link" data-auth-view="forgot">Forgot password?</button>
            </div>
            <button type="submit" class="btn btn-primary auth-submit">Sign in</button>
            <p class="auth-footer-copy">Don’t have an account? <button type="button" class="auth-inline-link" data-auth-view="register">Create one</button></p>
          </form>
        </div>
        <div class="auth-view-panel" data-auth-view-panel="register">
          <form class="auth-form" data-auth-form="register">
            <button type="button" class="auth-social-btn">Sign up with Google</button>
            <div class="auth-divider"><span>or create account</span></div>
            <div class="auth-field">
              <label for="registerName">Full name</label>
              <input id="registerName" name="registerName" type="text" placeholder="Your full name" required />
              <p class="auth-field-hint"></p>
            </div>
            <div class="auth-field">
              <label for="registerMobile">Mobile number</label>
              <input id="registerMobile" name="registerMobile" type="tel" placeholder="10-digit mobile" required />
              <p class="auth-field-hint"></p>
            </div>
            <div class="auth-field">
              <label for="registerEmail">Email address</label>
              <input id="registerEmail" name="registerEmail" type="email" placeholder="name@example.com" required />
              <p class="auth-field-hint"></p>
            </div>
            <div class="auth-field">
              <label for="registerPassword">Password</label>
              <input id="registerPassword" name="registerPassword" type="password" placeholder="Create a strong password" required />
              <p class="auth-field-hint"></p>
            </div>
            <div class="auth-field">
              <label for="registerConfirmPassword">Confirm password</label>
              <input id="registerConfirmPassword" name="registerConfirmPassword" type="password" placeholder="Re-type password" required />
              <p class="auth-field-hint"></p>
            </div>
            <label class="auth-check auth-terms"><input id="registerTerms" name="registerTerms" type="checkbox" /><span>I agree to the Terms & Privacy Policy.</span></label>
            <button type="submit" class="btn btn-primary auth-submit">Create account</button>
            <p class="auth-footer-copy">Already have an account? <button type="button" class="auth-inline-link" data-auth-view="login">Sign in</button></p>
          </form>
        </div>
        <div class="auth-view-panel" data-auth-view-panel="otp">
          <form class="auth-form" data-auth-form="otp">
            <div class="auth-field">
              <label for="otpMobile">Mobile number</label>
              <input id="otpMobile" name="otpMobile" type="tel" placeholder="10-digit mobile" required />
              <p class="auth-field-hint"></p>
            </div>
            <button type="button" class="btn btn-secondary auth-submit" id="sendOtpButton">Send OTP</button>
            <div class="auth-field">
              <label for="otpCode">OTP verification</label>
              <input id="otpCode" name="otpCode" type="text" placeholder="Enter 4-digit code" maxlength="4" />
              <p class="auth-field-hint"></p>
            </div>
            <div class="auth-row auth-row-end">
              <span class="auth-timer" id="otpTimer">Resend in 30s</span>
              <button type="button" class="auth-inline-link" id="resendOtpButton">Resend OTP</button>
            </div>
            <button type="submit" class="btn btn-primary auth-submit">Verify OTP</button>
            <p class="auth-footer-copy">Prefer email sign in? <button type="button" class="auth-inline-link" data-auth-view="login">Back to login</button></p>
          </form>
        </div>
        <div class="auth-view-panel" data-auth-view-panel="forgot">
          <form class="auth-form" data-auth-form="forgot">
            <div class="auth-field">
              <label for="forgotEmail">Email address</label>
              <input id="forgotEmail" name="forgotEmail" type="email" placeholder="Enter your email" required />
              <p class="auth-field-hint"></p>
            </div>
            <button type="submit" class="btn btn-primary auth-submit">Send reset link</button>
            <p class="auth-footer-copy"><button type="button" class="auth-inline-link" data-auth-view="login">Back to login</button></p>
          </form>
        </div>
        <div class="auth-toast" id="authToast" role="status" aria-live="polite"></div>
        <div class="auth-debug-panel" id="authDebugPanel" style="display:none; margin-top:12px; padding:10px; border:1px solid rgba(255,255,255,.16); border-radius:10px; font-size:.9rem; background:rgba(255,255,255,.04);">
          <strong>Debug</strong>
          <div id="authDebugContent" style="margin-top:6px; white-space:pre-wrap; word-break:break-word;"></div>
        </div>
      </div>
    </div>
  `);
}

initAuthModal();

const authModal = document.getElementById('authModal');
const authToast = document.getElementById('authToast');
const authTitle = document.getElementById('authTitle');
const authSubtitle = document.getElementById('authSubtitle');
const authDebugPanel = document.getElementById('authDebugPanel');
const authDebugContent = document.getElementById('authDebugContent');
const authViewButtons = document.querySelectorAll('.auth-switch-btn');
const authPanels = document.querySelectorAll('.auth-view-panel');
const authOpenButtons = document.querySelectorAll('[data-open-auth], a[href="login.html"], a[href="./login.html"], a[href="/login.html"], .nav-login');
const authCloseButtons = document.querySelectorAll('[data-close-auth]');
const authSocialButtons = document.querySelectorAll('.auth-social-btn');
const otpSendButton = document.getElementById('sendOtpButton');
const otpTimer = document.getElementById('otpTimer');
const otpResendButton = document.getElementById('resendOtpButton');
const API_BASE_URL = window.location.protocol === 'file:' ? 'http://localhost:3000' : window.location.origin;
const AUTH_STORAGE_KEY = 'raviSirAuthSession';
let otpCountdown = 30;
let otpTimerId = null;

function getStoredAuthSession() {
  try {
    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY) || window.sessionStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    return null;
  }
}

function saveAuthSession(payload, remember = true) {
  try {
    const serialized = JSON.stringify(payload);
    if (remember) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, serialized);
      window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } else {
      window.sessionStorage.setItem(AUTH_STORAGE_KEY, serialized);
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (error) {
    console.warn('Could not save auth session', error);
  }
}

function clearAuthSession() {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
}

function isProtectedPage() {
  const protectedPages = [
    '/class12-Video.html',
    '/class11-Video.html',
    '/download-pdf.html',
    '/mocktest.html',
    '/english-test-series.html',
    '/english-dashboard.html'
  ];
  return protectedPages.includes(window.location.pathname);
}

function updateAuthNavbar(user) {
  const loginButton = document.querySelector('.nav-login');
  if (!loginButton) return;

  if (user) {
    loginButton.outerHTML = `
      <div class="auth-user-chip">
        <img src="${user.photo || 'Asset/channel logo-2.png'}" alt="${user.name || 'User'}" class="auth-user-avatar" />
        <span>${user.name || 'Student'}</span>
        <button type="button" class="btn btn-secondary small btn-glow auth-logout-btn">Logout</button>
      </div>`;
  } else {
    loginButton.outerHTML = '<button type="button" class="btn btn-secondary small btn-glow nav-login" data-open-auth>Login</button>';
  }

  document.querySelector('.auth-logout-btn')?.addEventListener('click', async () => {
    try {
      const session = getStoredAuthSession();
      if (session?.accessToken) {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${session.accessToken}` }
        });
      }
    } catch (error) {
      console.warn('Logout request failed', error);
    } finally {
      clearAuthSession();
      window.location.reload();
    }
  });

  const authOpenButtons = document.querySelectorAll('[data-open-auth], a[href="login.html"], a[href="./login.html"], a[href="/login.html"], .nav-login');
  authOpenButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const isLink = button.tagName.toLowerCase() === 'a';
      if (isLink) {
        event.preventDefault();
      }
      if (user) {
        window.location.href = 'english-dashboard.html';
        return;
      }
      openAuthModal('login');
    });
  });
}

async function hydrateAuthState() {
  const storedSession = getStoredAuthSession();
  if (!storedSession?.accessToken) {
    updateAuthNavbar(null);
    if (isProtectedPage()) {
      openAuthModal('login');
      showAuthToast('Login is required to access this page.');
    }
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/check-auth`, {
      headers: { Authorization: `Bearer ${storedSession.accessToken}` }
    });
    const data = await response.json().catch(() => null);
    if (!response.ok || !data?.success) {
      clearAuthSession();
      updateAuthNavbar(null);
      if (isProtectedPage()) {
        openAuthModal('login');
        showAuthToast('Your session expired. Please sign in again.');
      }
      return null;
    }

    const rememberStorage = Boolean(window.localStorage.getItem(AUTH_STORAGE_KEY));
    saveAuthSession({ ...storedSession, user: data.user }, rememberStorage);
    updateAuthNavbar(data.user);
    return data.user;
  } catch (error) {
    clearAuthSession();
    updateAuthNavbar(null);
    if (isProtectedPage()) {
      openAuthModal('login');
      showAuthToast('Your session failed to validate. Please sign in again.');
    }
    return null;
  }
}

function showAuthToast(message) {
  if (!authToast) return;
  authToast.textContent = message;
  authToast.classList.add('is-visible');
  clearTimeout(showAuthToast.timeout);
  showAuthToast.timeout = setTimeout(() => {
    authToast.classList.remove('is-visible');
  }, 2200);
}

function updateDebugPanel(payload) {
  if (!authDebugPanel || !authDebugContent) return;
  const isDebugMode = new URLSearchParams(window.location.search).get('debug') === '1';
  authDebugPanel.style.display = isDebugMode ? 'block' : 'none';
  if (!isDebugMode) return;
  authDebugContent.textContent = payload;
}

function setAuthView(view) {
  authViewButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.authView === view);
  });

  authPanels.forEach((panel) => {
    panel.classList.toggle('is-active', panel.dataset.authViewPanel === view);
  });

  const copy = {
    login: ['Welcome back', 'Sign in to continue to your learning dashboard.'],
    register: ['Create account', 'Join our learning platform and unlock premium study resources.'],
    otp: ['WhatsApp OTP', 'Verify your mobile in seconds and continue smoothly.'],
    forgot: ['Reset password', 'We will send a secure reset link to your inbox.']
  };

  if (authTitle && authSubtitle && copy[view]) {
    authTitle.textContent = copy[view][0];
    authSubtitle.textContent = copy[view][1];
  }
}

function openAuthModal(view = 'login') {
  if (!authModal) return;
  authModal.classList.add('is-open');
  authModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('auth-modal-open');
  setAuthView(view);
}

function closeAuthModal() {
  if (!authModal) return;
  authModal.classList.remove('is-open');
  authModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('auth-modal-open');
}

function clearFieldHint(input) {
  const hint = input.closest('.auth-field')?.querySelector('.auth-field-hint');
  if (hint) hint.textContent = '';
}

function showFieldHint(input, message) {
  const hint = input.closest('.auth-field')?.querySelector('.auth-field-hint');
  if (hint) hint.textContent = message;
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateMobile(value) {
  return /^\d{10}$/.test(value);
}

function validatePassword(password) {
  const checks = [
    { label: 'Minimum 8 characters', test: password.length >= 8 },
    { label: 'Uppercase', test: /[A-Z]/.test(password) },
    { label: 'Lowercase', test: /[a-z]/.test(password) },
    { label: 'Number', test: /\d/.test(password) },
    { label: 'Special character', test: /[^A-Za-z0-9]/.test(password) }
  ];
  const failed = checks.filter((item) => !item.test);
  return failed.length === 0 ? '' : `Password needs: ${failed.map((item) => item.label).join(', ')}`;
}

function startOtpTimer() {
  if (!otpTimer) return;
  otpCountdown = 30;
  otpTimer.textContent = `Resend in ${otpCountdown}s`;
  if (otpTimerId) clearInterval(otpTimerId);
  otpTimerId = setInterval(() => {
    otpCountdown -= 1;
    otpTimer.textContent = otpCountdown > 0 ? `Resend in ${otpCountdown}s` : 'Resend OTP';
    if (otpCountdown <= 0) {
      clearInterval(otpTimerId);
      otpTimerId = null;
    }
  }, 1000);
}

function getErrorMessage(error, fallback) {
  if (error?.message) {
    return error.message;
  }

  if (error?.code === 'BACKEND_OFFLINE') {
    return 'Backend server is offline. Start it with npm run dev.';
  }

  if (error?.code === 'MONGODB_OFFLINE') {
    return 'MongoDB connection failed. Start MongoDB or use the fallback in-memory mode.';
  }

  if (error?.code === 'ROUTE_NOT_FOUND') {
    return 'API route not found. The backend endpoint may be using a different path.';
  }

  if (error?.code === 'VALIDATION_ERROR') {
    return error.detail || fallback;
  }

  return fallback;
}

async function requestJson(url, options = {}) {
  const requestBody = options.body ? JSON.stringify(JSON.parse(options.body), null, 2) : 'none';
  updateDebugPanel(`Backend URL: ${window.location.origin}\nAPI Route: ${url}\nRequest Body: ${requestBody}\nStatus: pending`);

  try {
    const statusResponse = await fetch('/api/status');
    const statusPayload = await statusResponse.json().catch(() => ({ database: 'unknown' }));
    window.__authDbStatus = statusPayload.database || 'unknown';
  } catch (error) {
    window.__authDbStatus = 'unknown';
  }

  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options
    });
    const text = await response.text();
    let parsed = null;

    try {
      parsed = text ? JSON.parse(text) : null;
    } catch (error) {
      parsed = { success: false, message: 'Invalid server response.', code: 'INVALID_RESPONSE' };
    }

    const message = `Backend URL: ${window.location.origin}\nAPI Route: ${url}\nRequest Body: ${requestBody}\nStatus Code: ${response.status}\nResponse: ${JSON.stringify(parsed, null, 2)}`;
    updateDebugPanel(message);

    if (!response.ok) {
      const error = parsed && typeof parsed === 'object' ? parsed : { success: false, message: 'Request failed.' };
      throw error;
    }

    return parsed;
  } catch (error) {
    const diagnostic = `Backend URL: ${window.location.origin}\nAPI Route: ${url}\nRequest Body: ${requestBody}\nStatus Code: error\nAxios Error: ${error?.message || 'Unknown error'}\nNetwork Status: ${navigator.onLine ? 'online' : 'offline'}\nMongoDB Status: ${window.__authDbStatus || 'unknown'}\nJWT Status: ${window.localStorage.getItem('authToken') ? 'stored' : 'missing'}`;
    updateDebugPanel(diagnostic);
    throw error;
  }
}

function finishAuthSuccess(message, payload, remember = true) {
  if (payload?.accessToken) {
    saveAuthSession(payload, remember);
    updateAuthNavbar(payload.user);
  }
  showAuthToast(message);
  setTimeout(() => {
    closeAuthModal();
    if (window.location.pathname.endsWith('/login.html')) {
      window.location.href = 'english-dashboard.html';
    }
  }, 950);
}

authOpenButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const isLink = button.tagName.toLowerCase() === 'a';
    if (isLink) {
      event.preventDefault();
    }
    openAuthModal('login');
  });
});

authSocialButtons.forEach((button) => {
  button.addEventListener('click', () => {
    showAuthToast('Google sign-in is not available here. Use email login or open the app from your deployed site.');
  });
});

authCloseButtons.forEach((button) => {
  button.addEventListener('click', closeAuthModal);
});

authModal?.addEventListener('click', (event) => {
  if (event.target === authModal) {
    closeAuthModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && authModal?.classList.contains('is-open')) {
    closeAuthModal();
  }
});

authModal?.addEventListener('click', (event) => {
  const target = event.target;
  if (target.matches('.auth-switch-btn')) {
    setAuthView(target.dataset.authView);
    return;
  }

  if (target.matches('.auth-inline-link')) {
    const view = target.dataset.authView;
    if (view) {
      setAuthView(view);
      return;
    }
  }
});

document.querySelectorAll('.auth-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formType = form.dataset.authForm;
    const submitButton = form.querySelector('.auth-submit');
    const inputs = form.querySelectorAll('input');
    inputs.forEach(clearFieldHint);

    if (formType === 'login') {
      const emailInput = form.querySelector('input[type="email"]');
      const passwordInput = form.querySelector('input[type="password"]');
      const rememberInput = form.querySelector('input[name="rememberMe"]');
      const rememberMe = rememberInput?.checked ?? false;
      let valid = true;

      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        showFieldHint(emailInput, 'Please enter a valid email address.');
        valid = false;
      }
      if (!passwordInput.value.trim()) {
        showFieldHint(passwordInput, 'Password is required.');
        valid = false;
      }

      if (!valid) return;
      submitButton.disabled = true;

      requestJson(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email: emailInput.value.trim(), password: passwordInput.value.trim() })
      })
        .then((body) => {
          submitButton.disabled = false;
          if (body.success) {
            finishAuthSuccess(body.message || 'Login successful. Welcome back!', body, rememberMe);
          } else {
            showAuthToast(getErrorMessage(body, 'Invalid credentials'));
          }
        })
        .catch((error) => {
          submitButton.disabled = false;
          showAuthToast(getErrorMessage(error, 'Unable to connect with backend.'));
        });
      return;
    }

    if (formType === 'register') {
      const nameInput = form.querySelector('input[name="registerName"]');
      const mobileInput = form.querySelector('input[name="registerMobile"]');
      const emailInput = form.querySelector('input[name="registerEmail"]');
      const passwordInput = form.querySelector('input[name="registerPassword"]');
      const confirmInput = form.querySelector('input[name="registerConfirmPassword"]');
      const termsInput = form.querySelector('input[name="registerTerms"]');
      let valid = true;

      if (!nameInput.value.trim()) {
        showFieldHint(nameInput, 'Full name is required.');
        valid = false;
      }
      if (!validateMobile(mobileInput.value.trim())) {
        showFieldHint(mobileInput, 'Enter a valid 10-digit mobile number.');
        valid = false;
      }
      if (!validateEmail(emailInput.value.trim())) {
        showFieldHint(emailInput, 'Please enter a valid email.');
        valid = false;
      }
      const passwordError = validatePassword(passwordInput.value);
      if (passwordError) {
        showFieldHint(passwordInput, passwordError);
        valid = false;
      }
      if (confirmInput.value !== passwordInput.value) {
        showFieldHint(confirmInput, 'Passwords do not match.');
        valid = false;
      }
      if (!termsInput.checked) {
        showFieldHint(termsInput, 'Please accept the terms to continue.');
        valid = false;
      }

      if (!valid) return;
      submitButton.disabled = true;

      requestJson(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        body: JSON.stringify({
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          password: passwordInput.value.trim(),
          confirmPassword: confirmInput.value,
          mobile: mobileInput.value.trim()
        })
      })
        .then((body) => {
          submitButton.disabled = false;
          if (body.success) {
            finishAuthSuccess(body.message || 'Account created. You can now continue.', body);
          } else {
            showAuthToast(getErrorMessage(body, 'Registration failed.'));
          }
        })
        .catch((error) => {
          submitButton.disabled = false;
          showAuthToast(getErrorMessage(error, 'Unable to connect with backend.'));
        });
      return;
    }

    if (formType === 'otp') {
      const mobileInput = form.querySelector('input[name="otpMobile"]');
      const codeInput = form.querySelector('input[name="otpCode"]');
      if (!validateMobile(mobileInput.value.trim())) {
        showFieldHint(mobileInput, 'Enter a valid 10-digit mobile number.');
        return;
      }
      if (!codeInput.value.trim() || codeInput.value.trim().length < 4) {
        showFieldHint(codeInput, 'Enter the 4-digit OTP.');
        return;
      }
      submitButton.disabled = true;

      requestJson(`${API_BASE_URL}/api/auth/verify-otp`, {
        method: 'POST',
        body: JSON.stringify({ mobile: mobileInput.value.trim(), otp: codeInput.value.trim() })
      })
        .then((body) => {
          submitButton.disabled = false;
          if (body.success) {
            finishAuthSuccess(body.message || 'OTP verified successfully.', body);
          } else {
            showAuthToast(getErrorMessage(body, 'OTP verification failed.'));
          }
        })
        .catch((error) => {
          submitButton.disabled = false;
          showAuthToast(getErrorMessage(error, 'Unable to connect with backend.'));
        });
      return;
    }

    if (formType === 'forgot') {
      const emailInput = form.querySelector('input[type="email"]');
      if (!validateEmail(emailInput.value.trim())) {
        showFieldHint(emailInput, 'Please enter a valid email address.');
        return;
      }
      submitButton.disabled = true;

      requestJson(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        body: JSON.stringify({ email: emailInput.value.trim() })
      })
        .then((body) => {
          submitButton.disabled = false;
          if (body.success) {
            finishAuthSuccess(body.message || 'Reset link sent to your email.');
          } else {
            showAuthToast(getErrorMessage(body, 'Request failed.'));
          }
        })
        .catch((error) => {
          submitButton.disabled = false;
          showAuthToast(getErrorMessage(error, 'Unable to connect with backend.'));
        });
    }
  });
});

if (otpSendButton) {
  otpSendButton.addEventListener('click', (event) => {
    event.preventDefault();
    const mobileInput = document.getElementById('otpMobile');
    if (!validateMobile(mobileInput.value.trim())) {
      showFieldHint(mobileInput, 'Enter a valid 10-digit mobile number.');
      return;
    }
    otpSendButton.disabled = true;

    requestJson(`${API_BASE_URL}/api/auth/send-otp`, {
      method: 'POST',
      body: JSON.stringify({ mobile: mobileInput.value.trim() })
    })
      .then((body) => {
        otpSendButton.disabled = false;
        if (body.success) {
          showAuthToast(body.message || 'OTP sent successfully.');
          startOtpTimer();
        } else {
          showAuthToast(getErrorMessage(body, 'Failed to send OTP.'));
        }
      })
      .catch((error) => {
        otpSendButton.disabled = false;
        showAuthToast(getErrorMessage(error, 'Unable to connect with backend.'));
      });
  });
}

if (otpResendButton) {
  otpResendButton.addEventListener('click', (event) => {
    event.preventDefault();
    const mobileInput = document.getElementById('otpMobile');
    if (!validateMobile(mobileInput.value.trim())) {
      showFieldHint(mobileInput, 'Enter a valid 10-digit mobile number.');
      return;
    }
    otpResendButton.disabled = true;

    requestJson(`${API_BASE_URL}/api/auth/send-otp`, {
      method: 'POST',
      body: JSON.stringify({ mobile: mobileInput.value.trim() })
    })
      .then((body) => {
        otpResendButton.disabled = false;
        if (body.success) {
          showAuthToast(body.message || 'OTP sent successfully.');
          startOtpTimer();
        } else {
          showAuthToast(getErrorMessage(body, 'Failed to resend OTP.'));
        }
      })
      .catch((error) => {
        otpResendButton.disabled = false;
        showAuthToast(getErrorMessage(error, 'Unable to connect with backend.'));
      });
  });
}

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

hydrateAuthState();

const navToggle = document.querySelector('.nav-toggle');
const navbar = document.querySelector('.navbar');

if (navToggle && navbar) {
  navToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// Typing animation for hero section
(() => {
  const phrases = [
    'Ravi Sir',
    'Professional English Teacher',
    '📘 12+ Years of Teaching Experience',
    '🏆 Trusted by Thousands of Students'
  ];

  const el = document.getElementById('heroTyped');
  const cursor = document.getElementById('heroCursor');
  if (!el) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let typing = true;

  const typeSpeed = 120; // slower typing
  const backSpeed = 70;  // slower backspace
  const pauseDelay = 2400; // slightly longer pause at end of phrase

  function tick() {
    const current = phrases[phraseIndex];
    if (typing) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex >= current.length) {
        typing = false;
        setTimeout(tick, pauseDelay);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex <= 0) {
        typing = true;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, 200);
        return;
      }
      setTimeout(tick, backSpeed);
    }
  }

  // start after small delay so page fonts load
  setTimeout(tick, 700);
})();

// Chat bot form submission handler
(() => {
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');

  if (!chatForm || !chatInput || !chatBody) return;

  function addChatBubble(message, type = 'user') {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${type}`;
    bubble.textContent = message;
    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function getRandomReply(replies) {
    return replies[Math.floor(Math.random() * replies.length)];
  }

  function getBotReply(question) {
    const lower = question.toLowerCase();
    if (!lower || lower.trim().length === 0) {
      return 'Please type your question so I can help you.';
    }

    const generalReplies = [
      'Tell me more about your English question and I will give you a simple answer.',
      'I can help with grammar, writing, speaking, and exam tips. What would you like to improve?',
      'Share your doubt in one sentence and I will explain it clearly for board exam success.'
    ];

    const greetings = ['hello', 'hi', 'hii', 'hey', 'namaste', 'what’s up', 'what is up'];
    if (greetings.some((word) => lower.includes(word))) {
      return getRandomReply([
        'Hello! I am Ravi sir AI Study Bot. Ask me about grammar, writing, or exam practice.',
        'Hi there! Tell me your English doubt and I will help you with a clear answer.',
        'Namaste! Ask any English question and I will help you improve your grammar or writing.'
      ]);
    }

    if (lower.includes('grammar') || lower.includes('tense') || lower.includes('sentence')) {
      return getRandomReply([
        'For grammar help, ask me about tenses, sentence structure, or subject-verb agreement.',
        'Need help with grammar rules? I can explain tenses, prepositions, punctuation, and sentence correction.',
        'Ask me any grammar question: I can correct sentences, explain tenses, and improve your writing.'
      ]);
    }

    if (lower.includes('writing') || lower.includes('paragraph') || lower.includes('essay') || lower.includes('letter')) {
      return getRandomReply([
        'I can help you write a strong paragraph, essay, or letter answer. Tell me the topic.',
        'Need an essay or paragraph draft? Share the topic and I will give you a clear structure and lines.',
        'For writing help, I can suggest good opening lines, main ideas, and conclusion sentences.'
      ]);
    }

    if (lower.includes('mock test') || lower.includes('exam') || lower.includes('board') || lower.includes('practice')) {
      return getRandomReply([
        'I can guide you through mock test preparation and answer practice questions step by step.',
        'Ask me a practice question from the board exam syllabus and I will help you solve it correctly.',
        'For exams, I can help with revision tips, time management, and important question practice.'
      ]);
    }

    if (lower.includes('vocabulary') || lower.includes('word') || lower.includes('meaning')) {
      return getRandomReply([
        'Ask me for word meanings, synonyms, antonyms, or vocabulary usage in a sentence.',
        'I can help you learn new words, their meanings, and how to use them correctly.',
        'Tell me a word or phrase and I will explain its meaning and examples.'
      ]);
    }

    if (lower.includes('pronunciation') || lower.includes('speak') || lower.includes('speaking')) {
      return getRandomReply([
        'I can suggest better sentence patterns and speaking tips for confidence in English.',
        'Ask me about pronunciation, speaking practice, or how to express ideas clearly in English.',
        'Tell me what you want to say and I will help you speak it in simple English.'
      ]);
    }

    return getRandomReply(generalReplies);
  }

  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const question = chatInput.value.trim();
    if (!question) {
      chatInput.value = '';
      chatInput.focus();
      return;
    }

    addChatBubble(question, 'user');
    chatInput.value = '';

    const reply = getBotReply(question);
    setTimeout(() => addChatBubble(reply, 'mentor'), 300);
  });
})();
