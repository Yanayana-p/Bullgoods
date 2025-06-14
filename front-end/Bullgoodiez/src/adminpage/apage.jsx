import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './apage.css';

const Apage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [users, setUsers] = useState([]);
  const [wishlists, setWishlists] = useState([]);
  const [groupedWishlists, setGroupedWishlists] = useState([]);
  const [view, setView] = useState('user'); // 'user', 'wishlist', or 'products'
  const [showPasswords, setShowPasswords] = useState({});
  const [showAllPasswords, setShowAllPasswords] = useState(false);
  const navigate = useNavigate();
  const [localProducts, setLocalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [editWishlistId, setEditWishlistId] = useState(null);
  const [editWishlistData, setEditWishlistData] = useState({});
  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (view === 'products') {
      fetchAllProducts();
    }
    if (view === 'wishlist') {
      fetchAllWishlists();
    }
    if (view === 'user') {
      fetchAllUsers();
    }
  }, [view]);

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      setIsLoggedIn(false);
      navigate('/');
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/all-users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      console.log('Fetched users from backend:', data);
      setUsers(Array.isArray(data.users) ? data.users : []);
    } catch (err) {
      setUsers([]);
      alert(err.message);
    }
  };

  const fetchAllWishlists = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/wishlist/all');
      if (!response.ok) throw new Error('Failed to fetch wishlists');
      const data = await response.json();
      setWishlists(data);
      // Group by user
      const grouped = {};
      data.forEach(item => {
        if (!grouped[item.student_id]) {
          grouped[item.student_id] = {
            student_id: item.student_id,
            first_name: item.first_name,
            last_name: item.last_name,
            wishlist: []
          };
        }
        grouped[item.student_id].wishlist.push({
          product_name: item.product_name,
          price: item.price,
          image_url: item.image_url
        });
      });
      setGroupedWishlists(Object.values(grouped));
    } catch (err) {
      setWishlists([]);
      setGroupedWishlists([]);
      alert(err.message);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setProducts([]);
      alert(err.message);
    }
  };

  const togglePassword = (userId) => {
    setShowPasswords(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  // Find the max number of wishlist products for any user
  const maxWishlistLength = groupedWishlists.reduce((max, user) => Math.max(max, user.wishlist.length), 0);

  const handleEditUser = (user) => {
    setEditUserId(user.student_id);
    setEditUserData({ ...user });
  };

  const handleCancelEdit = () => {
    setEditUserId(null);
    setEditUserData({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/${editUserId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: editUserData.first_name,
          last_name: editUserData.last_name,
          phone_number: editUserData.phone_number,
          email: editUserData.email,
          role: editUserData.role
        })
      });
      if (!response.ok) throw new Error('Failed to update user');
      setEditUserId(null);
      setEditUserData({});
      fetchAllUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditWishlist = (item) => {
    setEditWishlistId(item.student_id);
    setEditWishlistData({ ...item });
  };

  const handleWishlistChange = (e) => {
    const { name, value } = e.target;
    setEditWishlistData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWishlistSave = async () => {
    try {
      // First, update the user information
      const userResponse = await fetch(`http://localhost:5000/api/user/${editWishlistData.student_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: editWishlistData.first_name,
          last_name: editWishlistData.last_name
        })
      });

      if (!userResponse.ok) throw new Error('Failed to update user information');

      // Then, update the wishlist item (use id, not student_id)
      const wishlistResponse = await fetch(`http://localhost:5000/api/wishlist/${editWishlistData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_name: editWishlistData.product_name,
          price: editWishlistData.price
        })
      });

     

      // Refresh the wishlist data
      await fetchAllWishlists();
      
      // Reset edit state
      setEditWishlistId(null);
      setEditWishlistData({});
      
      alert('Wishlist updated successfully!');
    } catch (err) {
      console.error('Error updating wishlist:', err);
      alert(err.message);
    }
  };

  const handleWishlistCancel = () => {
    setEditWishlistId(null);
    setEditWishlistData({});
  };

  const handleEditProduct = (product) => {
    setEditProductId(product.id);
    setEditProductData({ ...product });
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setEditProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${editProductId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editProductData)
      });
      if (!response.ok) throw new Error('Failed to update product');
      setEditProductId(null);
      setEditProductData({});
      fetchAllProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleProductCancel = () => {
    setEditProductId(null);
    setEditProductData({});
  };

  // Delete handlers
  const handleDeleteUser = async (user) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/user/${user.student_id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete user');
      fetchAllUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteWishlist = async (item) => {
    if (!window.confirm('Are you sure you want to delete this wishlist entry?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/wishlist/${item.id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete wishlist entry');
      fetchAllWishlists();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteProduct = async (product) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/products/${product.id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete product');
      fetchAllProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  const renderTableHeaders = () => {
    switch (view) {
      case 'wishlist':
        return (
          <>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Wishlist</th>
          </>
        );
      case 'products':
        return (
          <>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>Seller ID</th>
            <th>Seller Name</th>
            <th>Created At</th>
          </>
        );
      default:
        return (
          <>
            <th></th>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>
              Password
              <button
                style={{ marginLeft: 6, background: 'none', border: 'none', cursor: 'pointer', verticalAlign: 'middle' }}
                title={showAllPasswords ? 'Hide All Passwords' : 'Show All Passwords'}
                onClick={() => setShowAllPasswords((prev) => !prev)}
              >
                <span role="img" aria-label="Show Password">👁️‍🗨️</span>
              </button>
            </th>
            <th>Role</th>
            <th>Timestamp</th>
          </>
        );
    }
  };

  const getFilteredRows = () => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      switch (view) {
        case 'wishlist': return wishlists;
        case 'products': return products;
        default: return users;
      }
    }
    switch (view) {
      case 'wishlist':
        return wishlists.filter(item =>
          (item.student_id && item.student_id.toString().toLowerCase().includes(q)) ||
          (item.first_name && item.first_name.toLowerCase().includes(q)) ||
          (item.last_name && item.last_name.toLowerCase().includes(q)) ||
          (item.product_name && item.product_name.toLowerCase().includes(q)) ||
          (item.price && item.price.toString().toLowerCase().includes(q))
        );
      case 'products':
        return products.filter(product =>
          (product.id && product.id.toString().toLowerCase().includes(q)) ||
          (product.name && product.name.toLowerCase().includes(q)) ||
          (product.description && product.description.toLowerCase().includes(q)) ||
          (product.price && product.price.toString().toLowerCase().includes(q)) ||
          (product.category && product.category.toLowerCase().includes(q)) ||
          (product.seller_id && product.seller_id.toString().toLowerCase().includes(q)) ||
          (product.seller_name && product.seller_name.toLowerCase().includes(q))
        );
      default:
        return users.filter(user =>
          (user.student_id && user.student_id.toString().toLowerCase().includes(q)) ||
          (user.first_name && user.first_name.toLowerCase().includes(q)) ||
          (user.last_name && user.last_name.toLowerCase().includes(q)) ||
          (user.email && user.email.toLowerCase().includes(q)) ||
          (user.phone_number && user.phone_number.toLowerCase().includes(q)) ||
          (user.role && user.role.toLowerCase().includes(q))
        );
    }
  };

  const renderTableRows = () => {
    switch (view) {
      case 'wishlist':
        return getFilteredRows().length === 0 ? (
          <tr><td colSpan={4}>No wishlist entries found.</td></tr>
        ) : (
          getFilteredRows().map((item, index) => (
            <tr key={index}>
              <td>
                {editMode && (
                  <button
                    style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 4 }}
                    title="Edit"
                    onClick={() => handleEditWishlist(item)}
                  >
                    <span role="img" aria-label="Edit">🖋</span>
                  </button>
                )}
                {deleteMode && (
                  <button
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}
                    title="Delete"
                    onClick={() => handleDeleteWishlist(item)}
                  >
                    <span role="img" aria-label="Delete">❎</span>
                  </button>
                )}
                {editWishlistId === item.student_id ? (
                  <input
                    name="student_id"
                    value={editWishlistData.student_id}
                    onChange={handleWishlistChange}
                  />
                ) : item.student_id}
              </td>
              <td>
                {editWishlistId === item.student_id ? (
                  <input
                    name="first_name"
                    value={editWishlistData.first_name}
                    onChange={handleWishlistChange}
                  />
                ) : item.first_name}
              </td>
              <td>
                {editWishlistId === item.student_id ? (
                  <input
                    name="last_name"
                    value={editWishlistData.last_name}
                    onChange={handleWishlistChange}
                  />
                ) : item.last_name}
              </td>
              <td>
                {editWishlistId === item.student_id ? (
                  <>
                    <input
                      name="product_name"
                      value={editWishlistData.product_name}
                      onChange={handleWishlistChange}
                    />
                    <input
                      name="price"
                      type="number"
                      value={editWishlistData.price}
                      onChange={handleWishlistChange}
                      style={{ marginLeft: 8 }}
                    />
                    <button onClick={handleWishlistSave} style={{ marginLeft: 8 }}>Save</button>
                    <button onClick={handleWishlistCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span>{item.product_name}</span>
                    <span style={{ marginLeft: 8, color: '#888' }}>₱{item.price}</span>
                    {item.image_url && (
                      <img src={`http://localhost:5000/uploads/${item.image_url}`} alt={item.product_name} style={{ width: 40, height: 40, objectFit: 'cover', marginLeft: 8, verticalAlign: 'middle' }} />
                    )}
                  </>
                )}
              </td>
            </tr>
          ))
        );
      case 'products':
        return getFilteredRows().length === 0 ? (
          <tr><td colSpan={9}>No products found.</td></tr>
        ) : (
          getFilteredRows().map((product, index) => (
            <tr key={index}>
              <td>
                {editMode && (
                  <button
                    style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 4 }}
                    title="Edit"
                    onClick={() => handleEditProduct(product)}
                  >
                    <span role="img" aria-label="Edit">🖋</span>
                  </button>
                )}
                {deleteMode && (
                  <button
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}
                    title="Delete"
                    onClick={() => handleDeleteProduct(product)}
                  >
                    <span role="img" aria-label="Delete">❎</span>
                  </button>
                )}
                {product.id}
              </td>
              <td>
                {editProductId === product.id ? (
                  <input
                    name="name"
                    value={editProductData.name}
                    onChange={handleProductChange}
                  />
                ) : product.name}
              </td>
              <td>
                {editProductId === product.id ? (
                  <input
                    name="description"
                    value={editProductData.description}
                    onChange={handleProductChange}
                  />
                ) : product.description}
              </td>
              <td>
                {editProductId === product.id ? (
                  <input
                    name="price"
                    type="number"
                    value={editProductData.price}
                    onChange={handleProductChange}
                  />
                ) : product.price}
              </td>
              <td>
                {editProductId === product.id ? (
                  <input
                    name="category"
                    value={editProductData.category}
                    onChange={handleProductChange}
                  />
                ) : product.category}
              </td>
              <td>
                {product.image_url && (
                  <img src={`http://localhost:5000/uploads/${product.image_url}`} alt={product.name} style={{ width: 40, height: 40, objectFit: 'cover' }} />
                )}
              </td>
              <td>
                {editProductId === product.id ? (
                  <input
                    name="seller_id"
                    value={editProductData.seller_id}
                    onChange={handleProductChange}
                  />
                ) : product.seller_id}
              </td>
              <td>
                {editProductId === product.id ? (
                  <input
                    name="seller_name"
                    value={editProductData.seller_name}
                    onChange={handleProductChange}
                  />
                ) : product.seller_name}
              </td>
              <td>
                {editProductId === product.id ? (
                  <>
                    <button onClick={handleProductSave} style={{ marginRight: 8 }}>Save</button>
                    <button onClick={handleProductCancel}>Cancel</button>
                  </>
                ) : product.created_at}
              </td>
            </tr>
          ))
        );
      default:
        return getFilteredRows().length === 0 ? (
          <tr><td colSpan={9}>No users found.</td></tr>
        ) : (
          getFilteredRows().map((user, index) => (
            <tr key={index}>
              <td>
                {editMode && (
                  <button
                    style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 4 }}
                    title="Edit"
                    onClick={() => handleEditUser(user)}
                  >
                    <span role="img" aria-label="Edit">🖋</span>
                  </button>
                )}
                {deleteMode && (
                  <button
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}
                    title="Delete"
                    onClick={() => handleDeleteUser(user)}
                  >
                    <span role="img" aria-label="Delete">❎</span>
                  </button>
                )}
              </td>
              <td>{user.student_id}</td>
              {editUserId === user.student_id ? (
                <>
                  <td><input name="first_name" value={editUserData.first_name} onChange={handleEditChange} /></td>
                  <td><input name="last_name" value={editUserData.last_name} onChange={handleEditChange} /></td>
                  <td><input name="email" value={editUserData.email} onChange={handleEditChange} /></td>
                  <td><input name="phone_number" value={editUserData.phone_number} onChange={handleEditChange} /></td>
                  <td>{showAllPasswords ? (user.password || 'N/A') : '••••••••'}</td>
                  <td><input name="role" value={editUserData.role} onChange={handleEditChange} /></td>
                  <td>{user.timestamp}</td>
                  <td>
                    <button onClick={handleSaveUser} style={{ marginRight: 8 }}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone_number}</td>
                  <td>{showAllPasswords ? (user.password || 'N/A') : '••••••••'}</td>
                  <td>{user.role}</td>
                  <td>{user.timestamp}</td>
                </>
              )}
            </tr>
          ))
        );
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <img src="/webcon.png" alt="Logo" className="logo" />

        <div className="nav-menu">
          <button onClick={() => setView('user')}>User</button>
          <button onClick={() => setView('wishlist')}>Wishlist</button>
          <button onClick={() => setView('products')}>Products</button>
        </div>

        <div className="nav-menu">
          <button onClick={() => { setEditMode((prev) => !prev); setDeleteMode(false); }}>UPDATE</button>
          <button onClick={() => { setDeleteMode((prev) => !prev); setEditMode(false); }}>DELETE</button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <input type="text" className="search-bar" placeholder="Search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          <button className="logout-btn" onClick={handleLogout}>LOG OUT</button>
        </div>

        <div className="admin-table">
          <table className="user-table">
            <thead>
              <tr>{renderTableHeaders()}</tr>
            </thead>
            <tbody>
              {renderTableRows()}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Apage;
