//import logo from './logo.svg';
import './App.css';
import Amplify, {API,graphqlOperation,Interactions}from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react'
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge'
import {CognitoAuth} from 'amazon-cognito-auth-js';
import React, { Component,useState } from 'react';
import {getNameDev} from './graphql/queries';
import { createNameDev } from './graphql/mutations';
import awsExports from './aws-exports';
import './index.css';

/*
Amplify.configure({
  Auth: {
    identityPoolId: 'eu-west-1:bfb1a422-e967-4476-b83e-58c05ce1cae9',
    region: 'eu-west-1'
  },
  Interactions: {
    bots: {
      "BookAppointment": {
        "name": "ScheduleAppointment",
        "alias": "$ChattyBot",
        "region": "eu-west-1",
      },
    }
  }
});
*/
Amplify.configure (awsExports);
const initialState = { name: '', date: '', address:' '}

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [bookings, setBooking] = useState([])

  useEffect(() => {
    FetchBooking()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function FetchBooking() {
    try {
      const BookingData = await API.graphql(graphqlOperation(getNameDev))
      const bookings = BookingData.data.listBookings.items
      setBooking(bookings)
    } catch (err) { console.log('error fetching booking',err) }
  }

  async function AddBooking() {
    try {
      if (!formState.name || !formState.date || !formState.address) return
      const booking = { ...formState }
      setBooking([...bookings, booking])
      setFormState(initialState)
      const makeBooking = await API.graphql(graphqlOperation(createNameDev, {input: booking}))
      console.log(makeBooking);
    } catch (err) {
      console.log('error creating booking:', err)
    }
  }

  return (
    
    <div style={styles.container}>
     <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <h2>Booking App</h2>
      <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Book</Navbar.Brand>
    <Nav className="mr-auto">
     
      <Nav.Link href="/bookinglist">Bookings</Nav.Link>
      
    </Nav>
    <Navbar.Collapse className="justify-content-end">
  </Navbar.Collapse>
  <NavDropdown title="General" id="collasible-nav-dropdown"> 
        <NavDropdown.Item href="#action/3.1">Settings</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Bookings</NavDropdown.Item>
      </NavDropdown>
  </Navbar>
      <input
        onChange={event => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={event => setInput('date', event.target.value)}
        style={styles.input}
        type="date" 
        value={formState.date}
        placeholder="Date"
      />
       <input
        onChange={event => setInput('address', event.target.value)}
        style={styles.input}
        value={formState.address}
        placeholder="Address"
      />
      <button style={styles.button} onClick={AddBooking}>Create Booking</button>
     
      {
        bookings.map((booking, index) => (
          <div key={booking.id ? booking.id : index} style={styles.booking}>
            <p style={styles.bookingName}>{booking.name}</p>
            <p style={styles.bookingDate}>{booking.date}</p>
            <p style={styles.bookingAddress}>{booking.address}</p>
          </div>
        ))
      }
      <AmplifySignOut/>
    
    </div>
    
  )
}

const styles = {
  container: { width: 700, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'purple', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
  
}

export default withAuthenticator(App);

