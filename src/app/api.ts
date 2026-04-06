import { projectId, publicAnonKey } from '/utils/supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-7d0d10de`;

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${publicAnonKey}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
}

export async function registerParticipant(data: any) {
  return fetchApi('/api/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getRegistrations() {
  return fetchApi('/api/registrations');
}

export async function submitFeedback(data: any) {
  return fetchApi('/api/feedback', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getFeedback() {
  return fetchApi('/api/feedback');
}
