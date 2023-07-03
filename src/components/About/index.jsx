import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './index.css';

export default function About() {

    const about = useRef();

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.pg', {
                delay: 11,
                duration: 2,
                opacity: 0,
                clipPath: 'inset(0 100% 0 0)',
                stagger: 3,
                ease: 'power4.inOut',
            })
        }, about.current)
        return () => ctx.revert();
    }, [])

    return (
        <div ref={about} className="about">
            <div className='copy'>
                <p className='pg'>
                We can consult on or build your brand presence, language, aesthetic from the ground up.
                </p>
                <p className='pg'>
                We write copy that resonates in 144 characters, as well as in print.
                </p>
                <p className='pg'>
                We get as detailed as fonts and typefaces, brand colours, and tone of voice. And we care about everything from which influencers you are aligning with, which publications you’re speaking to, and what your commercials look like. We have full production capabilities for photo shoots, and commercials. We are a one stop shop, a kitchen with just the right amount of chefs.
                </p>
                <p className='pg'>
                We can consult, and we can execute. We have a team of creatives in house, and a network of experts that we work with on a recurring basis. We understand and will push back on your unreasonable timelines, and will find the right balance of good art and good commerce.
                </p>
            </div>
        </div>
    )
}