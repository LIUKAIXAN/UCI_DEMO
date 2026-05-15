/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { AppLayout } from './layouts/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Orders } from './pages/Orders';
import { OrderWizard } from './pages/OrderWizard';
import { OrderDetails } from './pages/OrderDetails';
import { Reports } from './pages/Reports';
import { Account } from './pages/Account';
import { HelpCenter } from './pages/HelpCenter';
import { Login } from './pages/Login';

const AppRoutes = () => {
  const { isAuthenticated } = useAppContext();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/new" element={<OrderWizard />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="reports" element={<Reports />} />
          <Route path="account" element={<Account />} />
          <Route path="help" element={<HelpCenter />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

