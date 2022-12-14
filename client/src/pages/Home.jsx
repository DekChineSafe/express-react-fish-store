import React from 'react'
import { fetchFish, fetchPromotion } from '../hooks/Fish'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { motion } from "framer-motion"

import Logo from '../components/Home/Logo';
import Hero from '../components/Home/Hero';
import CardContainer from '../components/Home/CardContainer';
import Footer from '../components/Home/Footer';

function Home() {
    // useState
    const [loading, setLoading] = React.useState(true)
    const [fishes, setFishes] = React.useState(null)
    const [promotion, setPromotion] = React.useState(null)

    const [prevIndex, setPrevIndex] = React.useState(0)
    const [indexArray, setIndexArray] = React.useState(4)
    const [fishesSlice, setFishesSlice] = React.useState(null)

    // useEffect
    React.useEffect(() => {
            //fetch data paralell
            fetchAll()
        }, []
    )

    React.useEffect(() => {
        if (fishes) {
            setFishesSlice(fishes.slice(prevIndex, indexArray))
        }
        },[indexArray, prevIndex]
    )

    const fetchAll = async () => {
        const [fishRes, promoRes] = await Promise.all([
            fetchFish(),
            fetchPromotion()
        ])

        const sliceArray = fishRes.data.data.slice(0, indexArray)
        
        setFishes(fishRes.data.data);
        setPromotion(promoRes.data.data)
        setFishesSlice(sliceArray)
        setLoading(false)
        return
    }

    if (loading) {
        console.log("loading");
        return (
            <div className='bg-yellow-500 w-screen h-screen'>
                <motion.div animate={{ x: 85 }} transition={{
                    delay: 0.25,
                    x: { duration: 1.25 },
                    default: { ease: "linear" }
                }}>
                    <div className='flex items-center justify-center h-screen'>
                        <ClimbingBoxLoader
                            color={"#ffffff"}
                            loading={loading}
                            size={35}
                            aria-label="Loading Spinner"
                        />
                    </div>
                </motion.div>
            </div>
        )
    }

    if (fishes && promotion) {
        return (
            <div className='h-screen w-screen bg-slate-100'>
                    <Logo />
                    <Hero promotion={promotion} />
                    <CardContainer fishes={fishesSlice} setIndexArray={setIndexArray} indexArray={indexArray} setPrevIndex={setPrevIndex} prevIndex={prevIndex} />
                    <Footer /> 
            </div>
        )
    } else {
        return null
    }

}

export default Home