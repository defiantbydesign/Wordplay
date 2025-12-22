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

export default function SingleAudioPlayer({ block }: { block: singleAudioPlayerBlockProps }) {
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create Audio once
    audioRef.current = new Audio(block.audioFile?.url)

    const track = audioRef.current
    const onEnded = () => setIsPlaying(false)
    track?.addEventListener('ended', onEnded)

    const setMetaData = () => {
      // Calculate total duration of the song
      setTotalTime(formatTime(track.duration))
    }
    track.addEventListener('loadedmetadata', setMetaData)
  }, [block.audioFile?.url])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (!isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }

    setIsPlaying(!isPlaying)
  }

  const currentTime = '0:00'
  const [totalTime, setTotalTime] = useState('0:00')

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
        <audio preload="true" className="audioElement">
          <source src={block.audioFile.url} type={block.audioFile.mimeType || 'audio/mpeg'} />
        </audio>
      )}
      <div className="singleAudioControls">
        <div onClick={togglePlay} className={buttonClass}>
          <span></span>
          <span></span>
        </div>
        <div className="progressBarContainer">
          <input type="range" name="trackProgress" id="trackProgress" className="trackSlider" />
          <div className="timeIndicators">
            <div className="currentTime">{currentTime}</div>
            <div className="totalTime">{totalTime}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
