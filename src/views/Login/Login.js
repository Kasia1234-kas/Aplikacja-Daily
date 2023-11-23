import LocalStorage from "../../tools/LocalStorage";
import logo from '../../assets/img.png';

export default function Login() {

    const users = [
        {
            login: 'test1',
        },
        {
            login: 'test2',
        },
        {
            login: 'test3',
        }
    ];


    const handleLogin = (e) => {
        const login = e.target.login.value
        const foundUser = users.filter(user => user.login === login);

        if (foundUser.length > 0) {
            LocalStorage().save('logged', foundUser[0])
            window.location.href = '/'
        }
    }

    return (
        <section className="vh-100">
            <div className="container pb-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{borderRadius: "1rem"}}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img
                                        src={logo}
                                        alt="login form" className="img-fluid"/>
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form onSubmit={handleLogin}>
                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i className="fas fa-cubes fa-2x me-3" style={{color: "#ff6219"}}></i>
                                            </div>

                                            <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Zaloguj się</h5>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="login">Login (Możliwe loginy test1, test2, test3)</label>
                                                <input type="text" id="login" name={'login'}
                                                       placeholder={'login'}
                                                       className="form-control form-control-lg"/>
                                            </div>

                                            <div className="pt-1 mb-4">
                                                <button className="btn btn-dark btn-lg btn-block"
                                                        type="submit">Zaloguj
                                                </button>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
