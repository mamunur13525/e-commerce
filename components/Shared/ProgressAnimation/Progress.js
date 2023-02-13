import { withNProgress } from '@tanem/react-nprogress'
import React from 'react'

const Progress = ({ isFinished, progress, animationDuration }) => (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
        <Bar animationDuration={animationDuration} progress={progress} />
    </Container>
)

export default withNProgress(Progress)


const Container = ({ animationDuration, children, isFinished }) => (
    <div
        style={{
            opacity: isFinished ? 0 : 1,
            pointerEvents: 'none',
            transition: `opacity ${animationDuration}ms linear`,
        }}
    >
        {children}
    </div>
)


const Bar = ({
    animationDuration,
    progress,
}) => (
    <div
        className='bg-green-500 left-0 fixed top-0 w-full z-[1031] rounded-full'
        style={{
            height: 3,
            marginLeft: `${(-1 + progress) * 100}%`,
            transition: `margin-left ${animationDuration}ms linear`,
        }}
    >
        <div
            className='block h-full opacity-100 absolute right-0 '
            style={{
                boxShadow: '0 0 10px #22d222, 0 0 5px #22d222',
                transform: 'rotate(3deg) translate(0px, -4px)',
                width: 100,
            }}
        />
    </div>
)

