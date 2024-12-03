// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthProvider, Routes } from '@./Components';

export function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
