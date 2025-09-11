'use client'

import { motion } from 'framer-motion'

const MotionWrapper = ({
  children,
  direction = 'up',
  delay = 0,
  scale = false,
}) => {
  const variants = {
    up: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
    down: { initial: { opacity: 0, y: -40 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
    scale: { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 } },
  }

  const variant = scale ? variants.scale : variants[direction]

  return (
    <motion.div
      initial={variant.initial}
      animate={variant.animate}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  )
}

export default MotionWrapper
