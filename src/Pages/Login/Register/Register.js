import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthContext/AuthProvider';

const Register = () => {
     const [error, setErrot] = useState('');
     const [accepted, setAccepted] = useState(false);
    const { createUser, logOut, updateUserProfile, handleEmailVarification } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, photoURL, email, password);

        createUser(email, password)
        .then( result => {
            const user = result.user;
            form.reset();
            handleUpdateUserProfile(name, photoURL);
            verifyEmail();
            logOut();
            console.log(user);
            toast.success('Go to Check email')

        })
        .catch( e => {
             console.error(e)
             setErrot(e.message);
        });
    }

    const verifyEmail = () =>{
        handleEmailVarification()
        .then(()=>{})
        .catch(err => console.error(err))
    }
    
    const handleUpdateUserProfile = (name, photoURL) => {
        const profile = {
            displayName : name,
            photoURL : photoURL,
        }
        updateUserProfile(profile)
        .then(() => {})
        .catch(err => console.error(err))
    }

    const handleAccepted = (event) => {
        setAccepted(event.target.checked)
    }

    return (
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Name</Form.Label>
            <Form.Control name="name" type="text" placeholder="Your Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Photo URL</Form.Label>
            <Form.Control name="photoURL" type="text" placeholder="Phot URL" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter email" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Password" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                    type="checkbox"
                    onClick={handleAccepted}
                    label='Accept Terms and conditions' />
            </Form.Group>

        <Button variant="primary" type="submit" disabled={!accepted} >
            Register
        </Button>
        <Form.Text className="text-danger">
            {error}
        </Form.Text>
    </Form>
    );
}

export default Register;
