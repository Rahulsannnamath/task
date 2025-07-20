import React, { useState, useEffect } from 'react';
import { Trophy, Users, TrendingUp, Award, Plus, Zap, History, Star } from 'lucide-react';
import Header from './components/Header';
import ClaimPointsCard from './components/ClaimPointsCard';
import AddUserCard from './components/AddUserCard';
import RecentActivityCard from './components/RecentActivityCard';
import Leaderboard from './components/Leaderboard';

const App = () => {

  const [users, setUsers] = useState([]);
  
  const [selectedUserId, setSelectedUserId] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [isClaimingPoints, setIsClaimingPoints] = useState(false);
  const [lastClaimedPoints, setLastClaimedPoints] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  
  const sortedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints);

  // Fetch recent activity from backend
  const fetchActivity = async () => {
    try {
      const res = await fetch('http://localhost:8080/activity');
      const data = await res.json();
      setRecentActivity(data);
    } catch (err) {
      console.error('Error fetching activity:', err);
    }
  };

  // Add new user
  const handleAddUser = async () => {
    if (!newUserName.trim()) return;
    try {
      const res = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newUserName.trim() })
      });
      if (!res.ok) throw new Error('Failed to add user');
      const newUser = await res.json();
      setUsers(prev => [...prev, newUser]);
      setNewUserName('');
      await fetchActivity();
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

 
  const handleClaimPoints = async () => {
    if (!selectedUserId) return;
    setIsClaimingPoints(true);
    try {
      const res = await fetch(`http://localhost:8080/users/${selectedUserId}/claim`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to claim points');
      const { user: updatedUser, pointsAwarded } = await res.json();
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );
      setLastClaimedPoints(pointsAwarded);
      setIsClaimingPoints(false);
      await fetchActivity();
      setTimeout(() => setLastClaimedPoints(null), 3000);
    } catch (err) {
      setIsClaimingPoints(false);
      console.error('Error claiming points:', err);
    }
  };


  const getRankSuffix = (rank) => {
    if (rank === 1) return '1st';
    if (rank === 2) return '2nd';
    if (rank === 3) return '3rd';
    return `${rank}th`;
  };

  
  const getMedalEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8080/users"); 
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
    fetchActivity();
  }, []);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <Header users={users} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Claim Points Card */}
            <ClaimPointsCard
              users={users}
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
              handleClaimPoints={handleClaimPoints}
              isClaimingPoints={isClaimingPoints}
              lastClaimedPoints={lastClaimedPoints}
            />
            {/* Add User Card */}
            <AddUserCard
              newUserName={newUserName}
              setNewUserName={setNewUserName}
              handleAddUser={handleAddUser}
            />
            {/* Recent Activity Card */}
            <RecentActivityCard
              recentActivity={recentActivity}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
            />
          </div>
          {/* Right Column - Leaderboard */}
          <div className="lg:col-span-2">
            <Leaderboard
              sortedUsers={sortedUsers}
              getRankSuffix={getRankSuffix}
              getMedalEmoji={getMedalEmoji}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;