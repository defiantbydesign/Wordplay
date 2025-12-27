'use client'

import Image from 'next/image'
import { Rock_Salt, Oswald } from 'next/font/google'
import { Page } from '@/payload-types'
import { useState, useRef, useEffect } from 'react'
import cassette from '../../../../../media/Cassette.webp'

const marker = Rock_Salt({ subsets: ['latin'], weight: ['400'] })
const headerFont = Oswald({ subsets: ['latin'], weight: ['200', '400', '700'] })

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

  const trackInfoClass = marker.className + ' trackInfo'
  const trackInfoText = block.producerName + ' - ' + block.trackName

  return (
    <section className="singleAudioPlayer">
      <p className={trackInfoClass}>{trackInfoText}</p>
      {typeof block?.audioFile === 'object' && block.audioFile?.url && (
        <audio preload="true">
          <source src={block.audioFile.url} type={block.audioFile.mimeType || 'audio/mpeg'} />
        </audio>
      )}
      <div className="singleAudioControls">
        <div className="playPauseContainer">
          <div onClick={togglePlay} className={buttonClass}>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="progressBarContainer">
          <div className="timeIndicators currentTime">{currentTime}</div>
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
          <div className="timeIndicators totalTime">{duration}</div>
        </div>
      </div>
      <a href={block.audioFile?.url} download="Jan_2026_Wordplay_Beat" className="downloadBtn">
        DOWNLOAD NOW
      </a>
      <Image
        src={cassette.src}
        alt={cassette.alt || 'cassette'}
        width={cassette.width}
        height={cassette.height}
        className="cassette"
      />
    </section>
  )
}
