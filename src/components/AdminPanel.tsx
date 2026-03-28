import { useState, useEffect } from 'react';
import { getSubmissionsFromApi, updateSubmissionStatus } from '../services/formSubmission';
import { authStorage, getErrorMessage } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [formTypeFilter, setFormTypeFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadSubmissions().catch(() => {});
  }, []);

  // Debounced reload on filters
  useEffect(() => {
    const h = setTimeout(() => {
      loadSubmissions().catch(() => {});
    }, 400);
    return () => clearTimeout(h);
  }, [query, statusFilter, formTypeFilter]);

  const loadSubmissions = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await getSubmissionsFromApi({
        q: query || undefined,
        status: statusFilter || undefined,
        formType: formTypeFilter || undefined,
        page,
        pageSize,
      });
      setSubmissions(response.items);
      setTotal(response.total);
      if (selectedSubmission) {
        const updatedSelected = response.items.find((item) => item.id === selectedSubmission.id) || null;
        setSelectedSubmission(updatedSelected);
      }
    } catch (error) {
      const message = getErrorMessage(error, 'Failed to load submissions');
      setErrorMessage(message);
      if (message.toLowerCase().includes('unauthorized') || message.toLowerCase().includes('invalid token')) {
        authStorage.clearToken();
        navigate('/admin/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleStatusChange = async (submissionId: string, newStatus: string) => {
    try {
      setErrorMessage('');
      await updateSubmissionStatus(submissionId, newStatus);
      const updatedSubmissions = submissions.map(sub =>
        sub.id === submissionId ? { ...sub, status: newStatus } : sub
      );
      setSubmissions(updatedSubmissions);
      if (selectedSubmission?.id === submissionId) {
        setSelectedSubmission({ ...selectedSubmission, status: newStatus });
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error, 'Failed to update submission status'));
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Panel - Form Submissions</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => loadSubmissions()} className="refresh-btn">
            🔄 Refresh
          </button>
          <button
            onClick={() => {
              authStorage.clearToken();
              navigate('/admin/login');
            }}
            className="refresh-btn"
          >
            Logout
          </button>
        </div>
      </div>
      {errorMessage && (
        <div style={{ marginBottom: 12, padding: '10px 12px', borderRadius: 8, background: '#fef2f2', color: '#b91c1c' }}>
          {errorMessage}
        </div>
      )}
      <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name"
          style={{ padding: '8px 10px', minWidth: 220 }}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: '8px 10px' }}>
          <option value="">All status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="reviewed">Reviewed</option>
        </select>
        <select value={formTypeFilter} onChange={(e) => setFormTypeFilter(e.target.value)} style={{ padding: '8px 10px' }}>
          <option value="">All forms</option>
          <option value="life_history">Life history</option>
          <option value="social_security">Social security</option>
        </select>
        <button onClick={() => loadSubmissions()} className="refresh-btn">Apply</button>
      </div>

      <div className="admin-content">
        <div className="submissions-list">
          <h2>Pending Submissions ({submissions.length})</h2>
          {isLoading && <p>Loading submissions...</p>}
          {submissions.length === 0 ? (
            <div className="empty-state">
              <p>No submissions found.</p>
            </div>
          ) : (
            <div className="submissions-grid">
              {submissions.map((submission) => (
                <div 
                  key={submission.id} 
                  className={`submission-card ${selectedSubmission?.id === submission.id ? 'selected' : ''}`}
                  onClick={() => setSelectedSubmission(submission)}
                >
                  <div className="card-header">
                    <h3>{submission.submittedBy || submission.data?.personalInfo?.employeeName || 'Unnamed'}</h3>
                    <span className={`status-badge ${submission.status}`}>
                      {submission.status}
                    </span>
                  </div>
                  <div className="card-body">
                    <p><strong>ID:</strong> {submission.id}</p>
                    <p><strong>Submitted:</strong> {formatDate(submission.createdAt || submission.submittedAt)}</p>
                    <p><strong>Phone:</strong> {submission.data?.personalInfo?.phoneNumber || 'N/A'}</p>
                    <p><strong>Region:</strong> {submission.data?.personalInfo?.region || 'N/A'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedSubmission && (
          <div className="submission-details">
            <div className="details-header">
              <h2>Submission Details</h2>
              <button onClick={() => setSelectedSubmission(null)} className="close-btn">
                ✕
              </button>
            </div>
            
            <div className="details-content">
              <div className="status-controls">
                <label>Status:</label>
                <select 
                  value={selectedSubmission.status}
                  onChange={(e) => handleStatusChange(selectedSubmission.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="reviewed">Reviewed</option>
                </select>
              </div>

              <div className="detail-section">
                <h3>Personal Information</h3>
                <div className="detail-grid">
                  <div><strong>Employee Name:</strong> {selectedSubmission.data?.personalInfo?.employeeName || selectedSubmission.submittedBy || 'N/A'}</div>
                  <div><strong>Father's Name:</strong> {selectedSubmission.data?.personalInfo?.fatherName || 'N/A'}</div>
                  <div><strong>Date of Birth:</strong> {selectedSubmission.data?.personalInfo?.dateOfBirth || 'N/A'}</div>
                  <div><strong>Phone:</strong> {selectedSubmission.data?.personalInfo?.phoneNumber || 'N/A'}</div>
                  <div><strong>Region:</strong> {selectedSubmission.data?.personalInfo?.region || 'N/A'}</div>
                  <div><strong>Woreda:</strong> {selectedSubmission.data?.personalInfo?.woreda || 'N/A'}</div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Family Information</h3>
                <div className="detail-grid">
                  <div><strong>Marital Status:</strong> {selectedSubmission.data?.familyInfo?.maritalStatus || 'N/A'}</div>
                  <div><strong>Spouse Name:</strong> {selectedSubmission.data?.familyInfo?.spouseName || 'N/A'}</div>
                  <div><strong>Children:</strong> {selectedSubmission.data?.familyInfo?.children?.length || 0}</div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Education</h3>
                {(selectedSubmission.data?.education || []).map((edu: any, index: number) => (
                  <div key={index} className="education-item">
                    <strong>{edu.level}:</strong> {edu.schoolName || 'Not specified'}
                  </div>
                ))}
              </div>

              <div className="detail-section">
                <h3>Work Experience</h3>
                <p>{selectedSubmission.data?.workExperience?.length || 0} previous job(s)</p>
              </div>

              <div className="detail-actions">
                <button 
                  className="btn-approve"
                  onClick={() => handleStatusChange(selectedSubmission.id, 'approved')}
                >
                  ✓ Approve
                </button>
                <button 
                  className="btn-reject"
                  onClick={() => handleStatusChange(selectedSubmission.id, 'rejected')}
                >
                  ✗ Reject
                </button>
                <button 
                  className="btn-export"
                  onClick={() => {
                    const dataStr = JSON.stringify(selectedSubmission.data, null, 2);
                    const dataBlob = new Blob([dataStr], { type: 'application/json' });
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `submission-${selectedSubmission.id}.json`;
                    link.click();
                  }}
                >
                  📥 Export JSON
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
        <div>
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="refresh-btn"
          >
            ← Prev
          </button>
          <button
            style={{ marginLeft: 8 }}
            disabled={page * pageSize >= total}
            onClick={() => setPage((p) => p + 1)}
            className="refresh-btn"
          >
            Next →
          </button>
        </div>
        <div>
          <label style={{ marginRight: 6 }}>Per page:</label>
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span style={{ marginLeft: 8, color: '#475569' }}>
            Page {page} • Total {total}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

