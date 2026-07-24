/**
 * dashboard-init.js
 * -----------------
 * Kicks off all three dashboard sections on page load.
 * Load this LAST, after profile-data.js, auth.js, render.js,
 * continue-editing.js, and whats-new.js.
 */
document.addEventListener('DOMContentLoaded', () => {
  window.HunnidsDashboard.refreshProfileCard();
  window.HunnidsContinueEditing.refreshContinueEditing();
  window.HunnidsWhatsNew.refreshWhatsNew();
});
