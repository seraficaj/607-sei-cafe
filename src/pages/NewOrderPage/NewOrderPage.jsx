import { useState } from 'react';

export default function NewOrderPage() {
  const [menuItems, setMenuItems] = useState([]);

  // - Fetch the menuItems from the server via AJAX
  // - When the data comes back, call setMenuItems to save in state

  return (
    <h1>NewOrderPage</h1>
  );
}