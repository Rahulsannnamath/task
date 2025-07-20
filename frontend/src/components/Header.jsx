import React from 'react';
import { Trophy } from 'lucide-react';

const Header = ({ users }) => (
  <header className="bg-white shadow-sm border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gamified Leaderboard</h1>
            <p className="text-gray-600">Compete, earn points, and climb the rankings!</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{users.length}</div>
            <div className="text-sm text-gray-500">Total Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {users.reduce((sum, user) => sum + user.totalPoints, 0)}
            </div>
            <div className="text-sm text-gray-500">Total Points</div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header; 