import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import InventoryList from './components/Inventory/InventoryList';
import BookDetail from './components/Inventory/BookDetail';
import AccountingDashboard from './components/Accounting/AccountingDashboard';
import OrdersList from './components/Orders/OrdersList';
import OrderDetail from './components/Orders/OrderDetail';
import LoginPage from './components/Auth/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import ProfileSettings from './components/Settings/ProfileSettings';
import { AuthProvider } from './contexts/AuthContext';
import TransactionsList from './components/Accounting/TransactionsList';
import TransactionDetail from './components/Accounting/TransactionDetail';

export function App() {
  return <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>} />
          <Route path="/inventory" element={<PrivateRoute>
                <Layout>
                  <InventoryList />
                </Layout>
              </PrivateRoute>} />
          <Route path="/inventory/edit/:id" element={<PrivateRoute>
                <Layout>
                  <BookDetail />
                </Layout>
              </PrivateRoute>} />
          <Route path="/inventory/:id" element={<PrivateRoute>
                <Layout>
                  <BookDetail />
                </Layout>
              </PrivateRoute>} />
          <Route path="/accounting" element={<PrivateRoute>
                <Layout>
                  <AccountingDashboard />
                </Layout>
              </PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute>
                <Layout>
                  <OrdersList />
                </Layout>
              </PrivateRoute>} />
          <Route path="/orders/:id" element={<PrivateRoute>
                <Layout>
                  <OrderDetail />
                </Layout>
              </PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute>
                <Layout>
                  <ProfileSettings />
                </Layout>
              </PrivateRoute>} />
          <Route path="/accounting/transactions" element={<PrivateRoute>
                <Layout>
                  <TransactionsList />
                </Layout>
              </PrivateRoute>} />
          <Route path="/accounting/transactions/:id" element={<PrivateRoute>
                <Layout>
                  <TransactionDetail />
                </Layout>
              </PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>;
}

export default App;