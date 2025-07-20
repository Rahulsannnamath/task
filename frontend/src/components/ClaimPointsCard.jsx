import React from 'react';
import { Zap, Award, Star } from 'lucide-react';

const ClaimPointsCard = ({ users, selectedUserId, setSelectedUserId, handleClaimPoints, isClaimingPoints, lastClaimedPoints }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
    <div className="flex items-center space-x-2 mb-4">
      <Zap className="h-5 w-5 text-yellow-500" />
      <h2 className="text-xl font-semibold text-gray-800">Claim Points</h2>
    </div>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select User
        </label>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">-- Select a User --</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.totalPoints} points)
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleClaimPoints}
        disabled={!selectedUserId || isClaimingPoints}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
      >
        {isClaimingPoints ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            <span>Claiming...</span>
          </>
        ) : (
          <>
            <Award className="h-5 w-5" />
            <span>Claim Random Points (1-10)</span>
          </>
        )}
      </button>
      {lastClaimedPoints && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <Star className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-semibold">
              +{lastClaimedPoints} points awarded!
            </span>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default ClaimPointsCard; 