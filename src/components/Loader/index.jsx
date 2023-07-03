import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './index.css';

export default function Loader() {

    let loader = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            let tl = gsap.timeline({});
            // tl.to(loader.current, {
            //     autoAlpha: 1,
            // });
            tl.from(loader.current, {
                clipPath: 'inset(100% 0 0 0)',
                duration: .75, 
                ease: 'power4.inOut'
            }, 1);
            tl.from('.logoType', {
                opacity: 0,
                duration: 2,
                ease: 'power3.inOut',
            }, 1.5);
            tl.to('.logoType', {
                opacity: 0,
                duration: 1,
                ease: 'power3.inOut',
            }, 8);
            tl.to(loader.current, {
                clipPath: 'inset(0 0 100% 0)',
                duration: .75,
                ease: 'power4.inOut',
            }, 9);
        }, loader.current);
        return () => ctx.revert();
    }, []);

    return(
        <div ref={loader} className='loader'>
            <div className='typeBox'><div className='logoType'>"Before it was called the art world and now it's called the art market,<br/> and that's the difference between then and now."</div></div>
        </div>
    )
}