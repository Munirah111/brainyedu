import React, { useState } from 'react';
import { useFirestore } from '../hooks/useFirestore.js';
import './AdminPage.css';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('packages');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const collections = {
    packages: useFirestore('packages'),
    siteContent: useFirestore('siteContent'),
  };

  const activeCollection = collections[activeTab];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingItem?.id) {
      await activeCollection.update(editingItem.id, formData);
    } else {
      await activeCollection.add({ ...formData, order: Date.now() });
    }
    setEditingItem(null);
    setFormData({});
  };

  return (
    <div className="admin-page">
      <div className="container">
        <h1>Admin Dashboard</h1>

        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'packages' ? 'active' : ''}`}
            onClick={() => setActiveTab('packages')}
          >
            Packages
          </button>
          <button 
            className={`tab-btn ${activeTab === 'siteContent' ? 'active' : ''}`}
            onClick={() => setActiveTab('siteContent')}
          >
            Site Content
          </button>
        </div>

        <div className="admin-content">
          <button 
            className="btn btn-primary"
            onClick={() => setEditingItem({})}
          >
            Add New
          </button>

          <div className="items-list">
            {activeCollection.data?.map(item => (
              <div key={item.id} className="list-item">
                <span>{item.title || item.name || 'Item'}</span>
                <div>
                  <button onClick={() => setEditingItem(item)}>Edit</button>
                  <button onClick={() => activeCollection.remove(item.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>

          {editingItem && (
            <form onSubmit={handleSubmit} className="admin-form">
              <input
                type="text"
                placeholder="Title"
                value={formData.title || ''}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Price"
                value={formData.price || ''}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
              />
              <textarea
                placeholder="Description"
                value={formData.shortDescription || ''}
                onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.imageUrl || ''}
                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
              />
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <button type="button" onClick={() => setEditingItem(null)}>
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;