import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {auth} from '../../config/firebase';
import {Form,Button} from 'react-bootstrap';



const Login=({
        history
    })=>
{
    let navigate=useNavigate();
    const onLoginHandler = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        let email = formData.get('email');
        let password = formData.get('password');

        signInWithEmailAndPassword(auth,email,password).then( () => 
        {
            navigate('/bills'); 
        })
        .catch((error) => {
         navigate('/login');
        });
    }

    return(
        <Form id="login-form" onSubmit={onLoginHandler} method="POST">
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" name="email"/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" name="password"  />
  </Form.Group>
   <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
    );
}

export default Login;