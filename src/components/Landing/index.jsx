import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './index.css';

export default function Landing(){
    const landing = useRef();
    const title = useRef();

    useEffect(() => {

        // Landing Copy Animation
        let ctx = gsap.context(() => {
            gsap.from('.titleContainer', {
                duration: 6,
                clipPath: 'inset(100% 0 0 0)',
                // scaleY: 0,
                // opacity: 0,
                ease: 'power4.inOut',
                // stagger: 0.1,
                delay: 8,
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