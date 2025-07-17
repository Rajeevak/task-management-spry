
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import TaskManagement from './pages/TaskManagement';
import { TaskContextProvider } from './contexts/TaskContextProvider';
import NavigationBar from './pages/NavigationBar';

function TaskLayout() {
  return (
    <TaskContextProvider>
      <NavigationBar />
      <Outlet />
    </TaskContextProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/task-management" element={<TaskLayout />}>
          <Route index element={<TaskManagement completedTask={false} />} />
          <Route path="completed" element={<TaskManagement completedTask={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
