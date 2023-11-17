import { Variants, motion, useInView } from "framer-motion"
import { useEffect, useRef } from "react"

// const container: Variants = {
//   initial: { opacity: 1 },
//   animate: {
//     opacity: 1,
//     transition: {
//       delayChildren: 0.3,
//       staggerChildren: 0.05,
//       duration: 0.7
//     }
//   }
// }

const item: Variants = {
  initial: { y: 40, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.3
    }
  }
}

function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div ref={ref} variants={item} initial='initial' animate={isInView ? 'animate' : 'initial'} >
      {/* <motion.div variants={item} > */}
      {children}
      {/* </motion.div> */}
    </motion.div>
  )
}

export default Reveal
