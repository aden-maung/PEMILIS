const CandidateCard = ({ candidate, isSelected, onSelect, onShowVisi }) => {
  return (
    <div
      className={`candidate-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className="candidate-image-wrapper">
        <img src={candidate.image} alt={`Foto ${candidate.name}`} />
      </div>
      <h3>{candidate.number}. {candidate.name}</h3>
      <button
        className="btn-visi"
        onClick={(e) => {
          e.stopPropagation();
          onShowVisi(candidate);
        }}
      >
        Lihat Visi & Misi
      </button>
    </div>
  );
};

export default CandidateCard;
