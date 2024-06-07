import './Footer.css'
import { useState } from "react";
import { FaDiscord, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";


export const Footer = () => {
    const [discord, setDiscord] = useState(false);

    const handleDiscord = async (e: any) => {
        e.preventDefault()
        setDiscord(true)
        await navigator.clipboard.writeText('danieloliveira8056')
        setTimeout(() => {
            setDiscord(false)
        }, 1500)
    }

    return (
        <div className="flex flex-col justify-center bg-black h-32 items-center">
            <div className="flex">
                <a href="https://github.com/daniel-olive" className='hover:bg-gray-800 rounded-full' target="_blank">
                    <FaGithub style={{margin: '10px', width: "25px", height: '25px', color: "#fff"}} />
                </a>
                <a href="https://www.instagram.com/danieloliveiradell/" className='hover:bg-gray-800 rounded-full'target="_blank">
                    <FaInstagram style={{margin: '10px', width: "25px", height: '25px', color: "#fff"}} />
                </a>
         
                <a href=""  onClick={handleDiscord} className='hover:bg-gray-800 rounded-full' target="_blank" aria-label="Copiar nome de usuário">
                    {discord ?
                    <div className="flex absolute bottom-16 text-sm w-auto text-white font-sans font-bold p-2 rounded-md bg-green-500 balao z-0">Copiado!</div> : ''}
                    <FaDiscord style={{margin: '10px', width: "25px", height: '25px', color: "#fff"}} />
                </a>
                <a href="https://www.linkedin.com/in/daniel-olive-dev/"  className='hover:bg-gray-800 rounded-full' target="_blank">
                    <FaLinkedin style={{margin: '10px', width: "25px", height: '25px', color: "#fff"}} />
                </a>
            </div>
            <p className="text-white text-xs font-sans font-bold pt-2">© 2024 To Do List. Todos os direitos reservados.</p>
        </div>
    );
};
