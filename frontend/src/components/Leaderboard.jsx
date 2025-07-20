import React from 'react';
import { TrendingUp } from 'lucide-react';

const Leaderboard = ({ sortedUsers, getRankSuffix, getMedalEmoji }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
      <div className="flex items-center space-x-2">
        <TrendingUp className="h-6 w-6 text-white" />
        <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Rank
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Total Points
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedUsers.map((user, index) => {
            const rank = index + 1;
            return (
              <tr
                key={user._id}
                className={`hover:bg-gray-50 transition-colors duration-150 ${
                  rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getMedalEmoji(rank)}</span>
                    <span className={`text-lg font-bold ${
                      rank === 1 ? 'text-yellow-600' :
                      rank === 2 ? 'text-gray-500' :
                      rank === 3 ? 'text-orange-600' :
                      'text-gray-700'
                    }`}>
                      {getRankSuffix(rank)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                      rank === 1 ? 'bg-yellow-500' :
                      rank === 2 ? 'bg-gray-400' :
                      rank === 3 ? 'bg-orange-500' :
                      'bg-blue-500'
                    }`}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <div className={`text-lg font-semibold ${
                        rank <= 3 ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {user.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-lg font-bold ${
                    rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                    rank === 2 ? 'bg-gray-100 text-gray-800' :
                    rank === 3 ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {user.totalPoints}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default Leaderboard; 