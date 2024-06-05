import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";
import authpic from "../../assets/auth/img-1.jpeg"

const SignUp = () => {
    const { createUser, updateUser } = useContext(AuthContext);

    const handleregister = e => {
        e.preventDefault();
        const displayName = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photoURL = e.target.photo.value;

        const data = { email, password, displayName, photoURL }
        console.log(data);

        createUser(email, password)
            .then(result => {
                console.log(result.user);
                updateUser(displayName, photoURL)
                    .then(res => {
                        console.log(res.user);
                        Navigate('/')
                    })
                Swal.fire({
                    title: "User Successfully Registered",
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
            })
            .catch(error => {
                Swal.fire({
                    title: `error registering, ${error.code}`,
                    icon: "warning",
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
                console.error(error);
            })
    }

    return (
        <div className="p-12 min-h-screen bg-base-200">
            <Helmet>
                <title>Travel Tourism  | Registration</title>
            </Helmet>
            <div className="">
                <div className="text-center lg:text-left m-8">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                </div>
                <div className="card lg:card-side shadow-2xl bg-base-100">
                    <div className="lg:w-[52%] lg:h-[60%]">
                        <img className="w-full h-96 lg:h-[480px]" src={authpic} alt="" />
                    </div>
                    <form onSubmit={handleregister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Your name" name="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">PhotoURL</span>
                            </label>
                            <input type="text" placeholder="Photo URL" name="photo" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                        <p className="pl-5">
                            Already have an account? <Link to='/login'> <button className="btn btn-link">LogIn</button></Link>
                        </p>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default SignUp;