// Generate or get session ID
function getSessionId() {
  if (typeof window === 'undefined') return null;

  let sessionId = sessionStorage.getItem('madhaus_session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('madhaus_session_id', sessionId);
  }
  return sessionId;
}

// Track to Google Analytics
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// Track issue selection (both GA4 and backend)
export const trackIssueSelection = async (issueId, issueLabel) => {
  // Track to GA4
  trackEvent('issue_selected', {
    issue_id: issueId,
    issue_label: issueLabel,
  });

  // Track to backend
  try {
    const sessionId = getSessionId();
    const response = await fetch('/api/track-selection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ issueId, issueLabel, sessionId }),
    });

    if (!response.ok) {
      console.error('Failed to track selection');
    }
  } catch (error) {
    console.error('Error tracking selection:', error);
  }
};

// Fetch real percentages from backend
export const fetchIssuePercentages = async () => {
  try {
    const response = await fetch('/api/get-percentages');
    const data = await response.json();
    return data.percentages || {};
  } catch (error) {
    console.error('Error fetching percentages:', error);
    return {};
  }
};

// Other tracking functions
export const trackLearnMoreClick = (section) => {
  trackEvent('learn_more_clicked', { section });
};

export const trackPillarClick = (pillarName) => {
  trackEvent('pillar_clicked', { pillar: pillarName });
};
