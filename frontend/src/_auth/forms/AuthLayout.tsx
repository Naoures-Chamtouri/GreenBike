import { Navigate, Outlet } from "react-router-dom";

function AuthLayout() {
  const isAuth = false;
  return (
    <>
      {isAuth ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
          <img
            src="/assets/images/side-img.jfif"
            alt="side img"
            className="hidden xl:block w-1/2  object-cover h-screen bg-no-repeat"
          />
        </>
      )}
    </>
  );
}

export default AuthLayout;
