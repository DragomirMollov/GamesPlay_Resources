import { useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";

const initialValues = { email: '', password: '', 'confirm-password': '' };

export default function Register() {
    const [error, setError] = useState('');
    const register = useRegister();
    const navigate = useNavigate();

    const registerHandler = async (values) => {
        if (values.password !== values['confirm-password']) {
            return setError('Password missmatch!');
        };

        try {
            await register(values.email, values.password);

            navigate('/');
        } catch (error) {
            setError(error.message);
        };
    };

    const {
        values,
        changeHandler,
        submitHandler,
    } = useForm(initialValues, registerHandler);

    return (
        <section id="register-page" className="content auth">
            <form id="register" onSubmit={submitHandler}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={changeHandler}
                        placeholder="maria@email.com"
                    />

                    <label htmlFor="pass">Password:</label>
                    <input
                        type="password"
                        id="register-password"
                        name="password"
                        value={values.password}
                        onChange={changeHandler}
                    />

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        value={values['confirm-password']}
                        onChange={changeHandler}
                    />

                    {error && (
                        <p >
                            <span style={{fontSize: '20px', color: 'white'}}>{error}</span>
                        </p>
                    )}

                    <input className="btn submit" type="submit" value="Register" />

                    <p className="field">
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </div>
            </form>
        </section>
    );
};