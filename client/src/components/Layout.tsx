import { Outlet } from "react-router-dom"
import { Header } from "./Header"

export const Layout = () => {
    return (
        <>
            <div id="art-platform" className="flex flex-col justify-between mx-auto items-center w-[100%]">
                <div className="w-[100%] max-w-[1024px] px-[15px]">
                    <Header />
                    <Outlet />
                </div>
            </div>
        </>
    );
}
