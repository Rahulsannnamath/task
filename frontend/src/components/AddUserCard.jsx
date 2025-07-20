import React from 'react';
import { Plus, Users } from 'lucide-react';

const AddUserCard = ({ newUserName, setNewUserName, handleAddUser }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
    <div className="flex items-center space-x-2 mb-4">
      <Plus className="h-5 w-5 text-green-500" />
      <h2 className="text-xl font-semibold text-gray-800">Add New User</h2>
    </div>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Username
        </label>
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Enter username"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          onKeyPress={(e) => e.key === 'Enter' && handleAddUser()}
        />
      </div>
      <button
        onClick={handleAddUser}
        disabled={!newUserName.trim()}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 px-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <Users className="h-5 w-5" />
        <span>Add User</span>
      </button>
    </div>
  </div>
);

export default AddUserCard; 