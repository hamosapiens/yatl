// src/pages/Home.tsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main>
      <h1>📝 YATL - Yet Another Todo List</h1>
      <p>Welcome! Please <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link></p>
    </main>
  );
}
