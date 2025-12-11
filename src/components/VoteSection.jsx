import { useState } from 'react';
import CandidateCard from './CandidateCard';
import VisiMisiModal from './VisiMisiModal';
import { candidates } from '../data/candidates';

const VoteSection = ({ userData, onSubmitVote }) => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [reason, setReason] = useState('');
  const [modalCandidate, setModalCandidate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectCandidate = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCandidate) {
      alert('Pilih kandidat dulu.');
      return;
    }

    if (!reason.trim()) {
      alert('Tulis alasan memilih.');
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmitVote({
        candidate: selectedCandidate,
        reason: reason.trim()
      });
    } catch (error) {
      alert('Gagal mengirim vote. Silakan coba lagi.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="vote-section">
      <h2 className="subtitle">Pilih Kandidat</h2>

      <div className="candidate-grid">
        {candidates.map(candidate => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            isSelected={selectedCandidate?.id === candidate.id}
            onSelect={() => handleSelectCandidate(candidate)}
            onShowVisi={setModalCandidate}
          />
        ))}
      </div>

      {selectedCandidate && (
        <div className="reason-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Alasan Memilih:</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Tulis alasan kamu memilih kandidat (wajib)..."
                className="form-textarea"
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Mengirim...' : 'Submit Vote'}
            </button>
          </form>
        </div>
      )}

      {modalCandidate && (
        <VisiMisiModal
          candidate={modalCandidate}
          onClose={() => setModalCandidate(null)}
        />
      )}
    </div>
  );
};

export default VoteSection;
