import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Swal from 'sweetalert2'
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Providers/AuthProviders";
import auth from "../../firebase/firebase.config";
import authpic from "../../assets/auth/img-1.jpeg";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const LogIn = () => {
    const axiosPublic = useAxiosPublic();
    const googleProvider = new GoogleAuthProvider();
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
  //  console.log('state in the location login page', location.state)


    const handleLogIn = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            })
    }

    const HandleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
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

        <div className="p-12 min-h-screen bg-base-200">
            <Helmet>
                <title>Travel Tourism | Login</title>
            </Helmet>

            <div className="">
                <div className="text-center lg:text-left m-8">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card lg:card-side shadow-2xl bg-base-100">
                    <div className="lg:w-[52%] lg:h-[60%]">
                        <img className="w-full h-96 lg:h-[480px]" src={authpic} alt="" />
                    </div>
                    <form onSubmit={handleLogIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <div className="form-control">
                            <button onClick={HandleGoogleSignIn} className="btn text-white bg-red-600">Google login</button>
                        </div>
                        <p className="pl-5">
                            New Here? Please <Link to='/signup'> <button className="btn btn-link">Register</button></Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LogIn;