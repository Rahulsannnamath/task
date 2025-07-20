import React from 'react';
import { History, Award, Plus } from 'lucide-react';

const RecentActivityCard = ({ recentActivity, showHistory, setShowHistory }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        <History className="h-5 w-5 text-purple-500" />
        <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
      </div>
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="text-sm text-purple-600 hover:text-purple-800"
      >
        {showHistory ? 'Hide' : 'Show'}
      </button>
    </div>
    {showHistory && (
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {recentActivity.length === 0 ? (
          <p className="text-gray-500 text-sm">No recent activity</p>
        ) : (
          recentActivity.map(activity => (
            <div key={activity._id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                {activity.type === 'points_claimed' ? (
                  <Award className="h-4 w-4 text-yellow-500" />
                ) : (
                  <Plus className="h-4 w-4 text-green-500" />
                )}
                <span className="text-sm text-gray-700">
                  {activity.type === 'points_claimed' 
                    ? `${activity.userName} claimed +${activity.points} points`
                    : `${activity.userName} joined`
                  }
                </span>
              </div>
              <span className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleTimeString()}</span>
            </div>
          ))
        )}
      </div>
    )}
  </div>
);

export default RecentActivityCard; 