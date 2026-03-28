import type { LifeHistoryFormData } from '../types/formTypes';
import type { SocialSecurityFormData } from '../types/socialSecurityTypes';
import { apiFetch } from './api';

export interface SubmissionResponse {
  success: boolean;
  message: string;
  submissionId?: string;
}

/**
 * Send form data to admin via API
 */
export const submitFormToAdmin = async (formData: LifeHistoryFormData): Promise<SubmissionResponse> => {
  const result = await apiFetch<{ id: string }>('/submissions', {
    method: 'POST',
    body: JSON.stringify({
      formType: 'life_history',
      submittedBy: formData.personalInfo.employeeName,
      data: formData,
    }),
  });
  return {
    success: true,
    message: 'Form submitted successfully! Admin will review your submission.',
    submissionId: result.id,
  };
};

export const submitSocialSecurityFormToAdmin = async (formData: SocialSecurityFormData): Promise<SubmissionResponse> => {
  const result = await apiFetch<{ id: string }>('/submissions', {
    method: 'POST',
    body: JSON.stringify({
      formType: 'social_security',
      submittedBy: formData.employeePersonalStatus.fullNameWithSurname,
      data: formData,
    }),
  });
  return {
    success: true,
    message: 'Form submitted successfully! Admin will review your submission.',
    submissionId: result.id,
  };
};

export const getSubmissionsFromApi = async (params?: {
  q?: string;
  status?: string;
  formType?: string;
  page?: number;
  pageSize?: number;
}) => {
  const search = new URLSearchParams();
  if (params?.q) search.set('q', params.q);
  if (params?.status) search.set('status', params.status);
  if (params?.formType) search.set('formType', params.formType);
  if (params?.page) search.set('page', String(params.page));
  if (params?.pageSize) search.set('pageSize', String(params.pageSize));

  const query = search.toString();
  return apiFetch<{
    items: any[];
    total: number;
    page: number;
    pageSize: number;
  }>(`/submissions${query ? `?${query}` : ''}`, { auth: true });
};

export const updateSubmissionStatus = async (id: string, status: string, reviewNote = '') => {
  return apiFetch(`/submissions/${id}/status`, {
    method: 'PATCH',
    auth: true,
    body: JSON.stringify({ status, reviewNote }),
  });
};

