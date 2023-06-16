import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './index.css';

export default function Menu() {
    const menu = useRef();

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.navBox', {
                duration: 2,
                opacity: 0,
                y: 100,
                ease: 'power3.inOut',
                delay: 6.5,
            })
        }, menu.current)
        return () => ctx.revert();
    }, [])
    return (
        <div ref={menu} className='menu'>
            <div className='navBox'><a href='https://indd.adobe.com/embed/29ff1f14-a1ee-48dc-a6c2-e70bb720387a?startpage=1&allowFullscreen=true' target="_blank" rel="noopener noreferrer" className='navLink'>Our Work</a></div>
            <div className='navBox'><a href='mailto:get@byseanbrown.com' className='navLink'>Contact</a></div>
        </div>
    )
}