import { useState, useEffect } from 'react';
import IdentityForm from './components/IdentityForm';
import VoteSection from './components/VoteSection';
import ThankYouPage from './components/ThankYouPage';
import { candidates } from './data/candidates';
import './App.css';

const SHEET_URL = "https://script.google.com/macros/s/AKfycbwPNW18aNukSJCjM2ICwkxv6HhovH-RQFP4oxwQ-3I97o23Y3eRHVP3xZ0sfjnbGR_I/exec";
const VOTE_STORAGE_KEY = 'mpk_vote_completed';
const VOTE_DATA_KEY = 'mpk_vote_data';

function App() {
  const [currentView, setCurrentView] = useState('identity'); // identity, vote, thankyou
  const [userData, setUserData] = useState(null);
  const [votedCandidate, setVotedCandidate] = useState(null);

  useEffect(() => {
    // Check if user has already voted
    const hasVoted = localStorage.getItem(VOTE_STORAGE_KEY);
    const voteData = localStorage.getItem(VOTE_DATA_KEY);

    if (hasVoted === 'true' && voteData) {
      try {
        const parsedData = JSON.parse(voteData);
        const candidate = candidates.find(c => c.id === parsedData.candidateId);
        if (candidate) {
          setVotedCandidate(candidate);
          setCurrentView('thankyou');
        }
      } catch (error) {
        console.error('Error parsing vote data:', error);
      }
    }
  }, []);

  const handleProceedToVote = (data) => {
    setUserData(data);
    setCurrentView('vote');
  };

  const handleSubmitVote = async ({ candidate, reason }) => {
    const voteData = {
      nama: userData.fullname,
      kandidat: candidate.id,
      role: userData.role,
      alasan: reason,
      ekstrakuler: userData.ekskul || "",
      jabatanKelas: userData.jabatanKelas || ""
    };

    try {
      // Send to Google Sheets
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(voteData)
      });

      // Store vote completion in localStorage
      localStorage.setItem(VOTE_STORAGE_KEY, 'true');
      localStorage.setItem(VOTE_DATA_KEY, JSON.stringify({
        candidateId: candidate.id,
        timestamp: new Date().toISOString()
      }));

      // Update state and navigate to thank you page
      setVotedCandidate(candidate);
      setCurrentView('thankyou');
    } catch (error) {
      console.error('Error submitting vote:', error);
      throw error;
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">PEMILIHAN KETUA MPK</h1>

        {currentView === 'identity' && (
          <IdentityForm onProceed={handleProceedToVote} />
        )}

        {currentView === 'vote' && (
          <VoteSection
            userData={userData}
            onSubmitVote={handleSubmitVote}
          />
        )}

        {currentView === 'thankyou' && votedCandidate && (
          <ThankYouPage candidate={votedCandidate} />
        )}
      </div>
    </div>
  );
}

export default App;
