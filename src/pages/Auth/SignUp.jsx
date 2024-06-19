import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProviders";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import authpic from '../../assets/auth/img-1.jpeg'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const googleProvider = new GoogleAuthProvider();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            image: data.photoURL,
                            password: data.password,
                            role: 'user'
                        }
                        console.log(userInfo);
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database')
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })


                    })
                    .catch(error => console.log(error))
            })
    };


    const HandleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    role: 'user'
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.success) {
                            Swal.fire({
                                title: "User Logged In Successfully",
                                icon: "success",
                                showClass: {
                                    popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                                },
                                hideClass: {
                                    popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                                }
                            });
                            navigate(location?.state ? location.state : '/')
                        }
                    })
            })
            //       })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <>
            <Helmet>
                <title>Travel Tourism | Sign Up</title>
            </Helmet>
            <div className="p-12 min-h-screen bg-base-200">
                <div className="">
                    <div className="text-center lg:text-left mt-12 mb-8">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                    </div>
                    <div className="card lg:card-side shadow-2xl bg-base-100">
                        <div className="lg:w-[52%] lg:h-[60%]">
                            <img className="w-full h-96 lg:h-[480px]" src={authpic} alt="" />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"  {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                            <div className="form-control">
                                <button onClick={HandleGoogleSignIn} className="btn text-white bg-red-600">Google login</button>
                            </div>
                            <p className="pl-5">
                                Already have an account? <Link to='/login'> <button className="btn btn-link">LogIn</button></Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;