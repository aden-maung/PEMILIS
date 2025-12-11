const VisiMisiModal = ({ candidate, onClose }) => {
  if (!candidate) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{candidate.name}</h2>
        <h3 className="subtitle-modal">Visi</h3>
        <p>{candidate.visi}</p>
        <h3 className="subtitle-modal">Misi & Program Unggulan</h3>
        <p>{candidate.misi}</p>
      </div>
    </div>
  );f
};

export default VisiMisiModal;
