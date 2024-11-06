import { Route, Routes } from 'react-router-dom';
import { Products } from '@./products';
import { Orders } from '@./orders';
function Home() {
  return <h1>Home</h1>;
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/products" element={<Products />}></Route>
      <Route path="/Orders" element={<Orders />}></Route>
    </Routes>
  );
}

export default App;
