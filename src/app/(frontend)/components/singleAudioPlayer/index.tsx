'use client'

import Image from 'next/image'
import { Page } from '@/payload-types'
import { useState, useRef, useEffect } from 'react'

type singleAudioPlayerBlockProps = {
  audioFile: any
  producerImage: any
  producerName: string
  producerBio: string
  block: Page['layout'][0]
}
let rafID: number
let updateProgress: () => void

export default function SingleAudioPlayer({ block }: { block: singleAudioPlayerBlockProps }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create Audio
    audioRef.current = new Audio(block.audioFile?.url)

    updateProgress = () => {
      if (audioRef.current) {
        setCurrentTime(formatTime(audioRef.current.currentTime))
      }
      rafID = requestAnimationFrame(updateProgress)
    }

    const onEnded = () => setIsPlaying(false)
    audioRef.current?.addEventListener('ended', onEnded)

    const setMetaData = () => {
      // Calculate total duration of the song
      setDuration(formatTime(audioRef.current.duration))
    }
    audioRef.current.addEventListener('loadedmetadata', setMetaData)
  }, [block.audioFile?.url])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (!isPlaying) {
      audioRef.current.play()
      rafID = requestAnimationFrame(updateProgress)
    } else {
      cancelAnimationFrame(rafID)
      audioRef.current.pause()
    }

    setIsPlaying(!isPlaying)
  }

  const buttonClass = isPlaying ? 'playBtn' : 'playBtn pause'

  const formatTime = (time: number) => {
    time = Math.round(time)
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
    return `${minutes}:${formattedSeconds}`
  }

  return (
    <section className="singleAudioPlayer">
      <div className="producerInfo">
        {typeof block?.producerImage === 'object' && block.producerImage?.url && (
          <Image
            src={block.producerImage.url}
            alt={block.producerImage.alt || 'Producer Image'}
            width={100}
            height={100}
            className="producerImage"
          />
        )}
        <div className="producerText">
          <h3 className="producerName">{block.producerName}</h3>
          <p className="producerBio">{block.producerBio}</p>
        </div>
      </div>
      {typeof block?.audioFile === 'object' && block.audioFile?.url && (
        <audio preload="true">
          <source src={block.audioFile.url} type={block.audioFile.mimeType || 'audio/mpeg'} />
        </audio>
      )}
      <div className="singleAudioControls">
        <div onClick={togglePlay} className={buttonClass}>
          <span></span>
          <span></span>
        </div>
        <div className="progressBarContainer">
          <input
            type="range"
            name="trackProgress"
            id="trackProgress"
            className="trackSlider"
            min={0}
            max={audioRef.current?.duration}
            step={0.01}
            value={audioRef.current?.currentTime || 0}
            onChange={(e) => {
              const time = Number(e.target.value)
              setCurrentTime(time)
              if (audioRef.current) {
                audioRef.current.currentTime = time
              }
            }}
          />
          <div className="timeIndicators">
            <div className="currentTime">{currentTime}</div>
            <div className="totalTime">{duration}</div>
          </div>
        </div>
      </div>
      <a href={block.audioFile?.url} download="Jan_2026_Wordplay_Beat" className="downloadBtn">
        DOWNLOAD NOW
      </a>
    </section>
  )
}
