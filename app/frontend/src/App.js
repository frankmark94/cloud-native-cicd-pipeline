import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// API URL from environment variable or default to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Home component
const Home = () => (
  <div className="home">
    <h2>Welcome to the CI/CD Pipeline Demo</h2>
    <p>This is a demonstration of a cloud-native CI/CD pipeline for microservices with Kubernetes.</p>
    <p>The application consists of a React frontend and a Node.js/Express backend.</p>
  </div>
);

// Items component
const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/items`);
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching items. Please try again later.');
        setLoading(false);
        console.error('Error fetching items:', err);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <div>Loading items...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="items">
      <h2>Items</h2>
      <div className="items-list">
        {items.map(item => (
          <div key={item.id} className="item-card">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <Link to={`/items/${item.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

// Item Detail component
const ItemDetail = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get item ID from URL
  const itemId = window.location.pathname.split('/').pop();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/items/${itemId}`);
        setItem(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching item details. Please try again later.');
        setLoading(false);
        console.error('Error fetching item:', err);
      }
    };

    fetchItem();
  }, [itemId]);

  if (loading) return <div>Loading item details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!item) return <div>Item not found</div>;

  return (
    <div className="item-detail">
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <Link to="/items">Back to Items</Link>
    </div>
  );
};

// About component
const About = () => (
  <div className="about">
    <h2>About This Project</h2>
    <p>This project demonstrates a fully automated CI/CD pipeline that deploys a microservices-based application onto a Kubernetes cluster.</p>
    <p>It leverages containerization with Docker, automates tests, performs vulnerability scanning, and implements Kubernetes deployment automation with GitOps principles.</p>
    <h3>Technologies Used:</h3>
    <ul>
      <li>Frontend: React</li>
      <li>Backend: Node.js/Express</li>
      <li>Containerization: Docker</li>
      <li>CI/CD: GitHub Actions</li>
      <li>Orchestration: Kubernetes</li>
      <li>Infrastructure as Code: Terraform</li>
      <li>Observability: Prometheus, Grafana, Loki</li>
    </ul>
  </div>
);

// Main App component
function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>CI/CD Pipeline Demo</h1>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/items">Items</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </nav>
        </header>
        
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<Items />} />
            <Route path="/items/:id" element={<ItemDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>CI/CD Pipeline Demo &copy; {new Date().getFullYear()}</p>
          <p>
            <a href="https://github.com/yourusername/cicd-pipeline-demo" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App; 