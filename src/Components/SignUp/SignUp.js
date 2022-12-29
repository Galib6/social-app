import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import { FaGoogle } from 'react-icons/fa';
import { GoogleAuthProvider } from 'firebase/auth';
import { AuthContext } from '../../context/AuthProvider';



const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { createUser, updateUser, setUser, signInwithGoolge, setLoading } = useContext(AuthContext);
    const [signUpError, setSignUPError] = useState('')
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();



    const handleSignUp = (data) => {
        //console.log(data);
        setSignUPError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('User Created Successfully.')
                const userInfo = {
                    displayName: data.name,
                    photoURL: data.photo
                }
                updateUser(userInfo)
                    .then(result => {
                        toast.success("Sucessfully Logged in")
                        // saveUser(data.name, data.email, data.password, data.type)
                        reset()

                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                //console.log(error)
                setSignUPError(error.message)
            });
    }

    // const saveUser = (name, email, password, type) => {
    //     const user = { name, email, password, type }
    //     fetch("https://sell-point-server.vercel.app/users", {
    //         method: "POST",
    //         headers: {
    //             "content-type": "application/json"
    //         },
    //         body: JSON.stringify(user)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             // setCreatedUserEmail(email);
    //             //console.log(data)
    //         })
    // }

    const handleGoogleSignIn = () => {
        signInwithGoolge(provider)
            .then(res => {
                setLoading(true)
                const user = res.user;
                setUser(user)
                toast.success("Seccessfully Sign up")

                // const currentUser = {
                //     email: user.email
                // }

                //console.log(currentUser)
                // get jwt token
                // fetch('https://sell-point-server.vercel.app/jwt', {
                //     method: 'POST',
                //     headers: {
                //         'content-type': 'application/json'
                //     },
                //     body: JSON.stringify(currentUser)
                // })

                // .then(res => res.json())
                // .then(data => {
                //     //console.log(data);
                //     // local storage is the easiest but not the best place to store jwt token
                //     localStorage.setItem('s-token', data.token);
                // });

                const userData = {
                    name: user.displayName,
                    email: user.email

                }
                // fetch("https://sell-point-server.vercel.app/gsignup", {
                //     method: "POST",
                //     headers: {
                //         "content-type": "application/json",
                //         // authorization: `bearer ${localStorage.getItem("s-token")}`
                //     },
                //     body: JSON.stringify(userData)
                // })
                //     .then(res => res.json())
                //     .then(res => {
                //         //console.log(res)
                //         setLoading(false)
                //     })

                setLoading(false)
            })
            .catch(err => {
                console.error(err)
            })
    }



    return (
        <div className='h-[800px] flex justify-center items-center '>
            <div className='w-96 p-7 border shadow-lg'>
                <h2 className='text-2xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Name is Required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" {...register("email", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Photo Url</span></label>
                        <input type="photo" {...register("photo", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.photo && <p className='text-red-500'>{errors.photo.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 characters long" },
                            // pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    <div className="divider"></div>
                    <input className='btn btn-accent w-full' value="Sign Up" type="submit" />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                <p>Already have an account?<Link className='text-primary' to="/login"> Please Login</Link></p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSignIn} className=" mb-5 mr-5 btn btn-outline btn-ghost w-full">< FaGoogle /><span className='ml-2'>sign in google</span></button>

            </div>
        </div>
    );
};

export default SignUp;