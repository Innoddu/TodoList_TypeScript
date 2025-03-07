// src/Routes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CompletedItems from '../pages/CompleteItems';
import ItemPageLoggedInView from '../pages/ItemPageLoggedInView';
import ItemPageLoggedOutView from '../pages/ItemPageLoggedOutPage';

interface RoutesProps {
  loggedInUser: boolean;
}

const AppRoutes: React.FC<RoutesProps> = ({ loggedInUser }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          loggedInUser ? <ItemPageLoggedInView /> : <ItemPageLoggedOutView />
        }
      />
      {/* 추가적인 라우트 정의 */}
      <Route path="/completed-tasks" element={<CompletedItems />} />
    </Routes>
  );
};

export default AppRoutes;
