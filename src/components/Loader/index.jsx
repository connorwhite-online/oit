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
            tl.from('.line', {
                clipPath: 'inset(0 100% 0 0)',
                duration: 1,
                ease: 'power4.inOut',
            }, 2);
            tl.from('.logoType', {
                opacity: 0,
                duration: 1,
                y: 100,
                // rotateZ: 20,
                ease: 'power3.inOut',
            }, 2);
            tl.to('.line', {
                clipPath: 'inset(0 0 0 100%)',
                duration: 1,
                ease: 'power4.inOut',
            }, 5);
            tl.to('.logoType', {
                opacity: 0,
                duration: 1,
                // delay: 2,
                y: 100,
                // rotateX: -90,
                ease: 'power3.inOut',
            }, 5);
            tl.to(loader.current, {
                clipPath: 'inset(0 0 100% 0)',
                duration: .75,
                ease: 'power4.inOut',
            });
        }, loader.current);
        return () => ctx.revert();
    }, []);

    return(
        <div ref={loader} className='loader'>
            <div className='typeBox'><div className='logoType'>OUR INITIAL THOUGHTS</div><div className='line'></div></div>
        </div>
    )
}