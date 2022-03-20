import { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Registration.css';
import { Image } from 'react-bootstrap';
import LoginAlert from './LoginAlert';
import React from 'react';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.registrationAlert = React.createRef();
  }


  handleSumbit = event => {
    event.preventDefault();
    if (event.target.password.value === event.target.confirmPassword.value) {
      this.registerUser(event.target.name.value, event.target.surname.value, event.target.email.value, event.target.dob.value, event.target.password.value);
    }

  }

  registerUser(name, surname, email, dob, password) {
    fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
        email: email,
        dob: dob,
        password: password,
      })
    }).then(function (response) {

      if (response.status === 200) {
        this.showRegistrationAlert("success", "User registered", "You can now log in when you use your credentials.");
      }
      else {
        this.showRegistrationAlert("danger", "User already exists", "Please choose a different name.");
      }
    }.bind(this)).catch(function (error) {
      this.showRegistrationAlert("danger", "Error", "Something went wrong");

    }.bind(this))

  }


  showRegistrationAlert(variant, heading, message) {
    this.registrationAlert.current.setVariant(variant);
    this.registrationAlert.current.setHeading(heading);
    this.registrationAlert.current.setMessage(message);
    this.registrationAlert.current.setVisible(true);

  }



  render() {
    return (
      <>

        <div className='Register' style={{
          backgroundImage: `url(https://i.pinimg.com/originals/0a/4d/cb/0a4dcb92fa2d3c601b58d72720d6bec4.jpg)`,
          height: "1080px"
        }}>
          <table className='registerTable'>
            <tr>
              <td>
              <Image
                img src="https://www.clipartmax.com/png/full/52-525683_cookie-clipart-cartoon-cookie-house-cookies-free-clip-chocolate-chip-cookies-cartoon.png"
                alt="Hungrybelly" className="center"
              />
              <Form onSubmit={this.handleSumbit}>

                <Form.Group className='registerForm' controlId='name' size='lg'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control autoFocus name='name' maxLength={16} />
                </Form.Group>

                <Form.Group className='registerForm' controlId='surname' size='lg'>
                  <Form.Label>Surname</Form.Label>
                  <Form.Control autoFocus name='surname' maxLength={16} />
                </Form.Group>


                <Form.Group className='registerForm' controlId='email' size='lg'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" autoFocus name='email' maxLength={24} />
                </Form.Group>

                <Form.Group className='registerForm' controlId="dob">
                  <Form.Label>Select Date</Form.Label>
                  <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                </Form.Group>

                <Form.Group className='registerForm' controlId='password' size='lg'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' name='password' minLength={6} />
                </Form.Group>

                <Form.Group className='registerForm' controlId='confirmPassword' size='lg'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type='password' name='confirmPassword' minLength={6} />
                </Form.Group>

                <Button className='registerButton' size='lg' type='submit'>Register</Button>
                <RegistrationAlert ref={this.registrationAlert} />
              </Form>
              </td>
            </tr>
          </table>
        </div>
      </>
    )
  }
}

export default Registration;