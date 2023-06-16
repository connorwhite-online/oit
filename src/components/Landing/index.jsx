import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './index.css';

export default function Landing(){
    const landing = useRef();
    const title = useRef();

    useEffect(() => {
        // Trying to split text
        var char = title.current.innerHTML.split('');
        console.log(char)
        // const characters = gsap.utils.toArray('.title');

        // Landing Copy Animation
        let ctx = gsap.context(() => {
            gsap.from('.titleContainer', {
                duration: 2,
                clipPath: 'inset(100% 0 100% 0)',
                ease: 'power4.inOut',
                // stagger: 0.1,
                delay: 6.5,
            })
        }, landing.current)
        return () => ctx.revert();
    }, [])
    return (
        <div ref={landing} className='landing'>
            <div className='titleContainer'><div ref={title} className='title'>INITIAL THOUGHTS</div></div>
        </div>
    )
}