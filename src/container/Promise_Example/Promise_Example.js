import React from 'react';
import { useEffect } from 'react';

function Promise_Example(props) {

    const One = () => {
        return "one";
    }

    // const Two = () => {      // synchronous
    //     return "two";
    // }

    // const Two = () => {      // asynchronous
    //     setTimeout(() => {
    //         return "two";
    //     },2000)
    // }

    const Two = () => {          // async,await
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("two");
            },2000);
        })
    }

    const Three = () => {
        return "three";
    }

    const All = async () => {
        const o = One()
        console.log(o);

        const t = await Two()
        console.log(t);

        const th = Three()
        console.log(th);
    }

    useEffect (() => {
        All()
    },[])

    //callback function

    const Display = (c) => {
        console.log(c);
    }

    const sum = (Display) => {
        let a = 50;
        let b = 20;

        let c = a + b;
        console.log(c);
        Display(c)
    }

    sum(Display)

    return (
        <div>
            
        </div>
    );
}

export default Promise_Example;