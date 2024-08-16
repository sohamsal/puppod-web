// homepage.tsx
'use client';
import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Typewriter } from 'react-simple-typewriter';

const Homepage: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container fluid className="p-0 text-center d-flex flex-column justify-content-center align-items-center home-section">
      <h1>
        <span style={{ color: 'black', fontWeight: 'bold', fontSize: '2.5rem' }}>
          <Typewriter
            words={[
              "Compare 2 dogs from database at once",
              "Create scatter-plot graphs for any x and y ranges in the database",
              "Enter independent variables, a prediction parameter, and a test dog to utilize a regression model to predict the expected outcome or value for the test dog",
              "Developed by Manav, Soham, Nick, Emily, Pranav, Andrew, and Sarah",
              "Created at the University of Michigan"
            ]}
            loop={5}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={90}
            delaySpeed={3000}
          />
        </span>
      </h1>
      <div className="mt-3">
        <Button
          href="https://www.atlasdigital.org/"
          variant="link"
          style={{
            fontSize: '1.5rem',
            backgroundColor: '#6d8ee3',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '10px',
            textDecoration: 'none',
            boxShadow: isHovered ? '0px 6px 10px rgba(0, 0, 0, 0.2)' : '0px 4px 6px rgba(0, 0, 0, 0.1)',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Developed by Atlas Digital
        </Button>
      </div>
    </Container>
  );
};

export default Homepage;
