import { useLottie } from 'lottie-react'
import groovyWalkAnimation from 'src/config/lottie.json'


const LottieView = (props) => {
    const options = {
        animationData: groovyWalkAnimation,
        loop: false,
        autoplay: true,
        onComplete: () => {
            props.showLottie(false)
        },
        onDOMLoaded: () => {
            console.log('开始加载1')
            props.setLoading(false)
        },
        style: {
            height: '80vh',
        }
    }
   
    const { View, setSpeed } = useLottie(options)
    
    return View
}
   
export default LottieView