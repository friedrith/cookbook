/* eslint-disable jsx-a11y/media-has-caption */
import { useRef, useEffect } from 'react'
import { maxBy } from 'lodash'

import '@tensorflow/tfjs'
import * as handpose from '@tensorflow-models/handpose'
// import Webcam from 'react-webcam'

import * as fp from 'fingerpose'

type Gesture = {
  name: string
  score: number
}

type Hand = {
  boundingBox: {
    topLeft: number[]
    bottomRight: number[]
  }
}

const getMostProbableGesture = (gestures: Gesture[]) =>
  maxBy(gestures, (g: Gesture) => g.score)

const SCORE_THRESHOLD = 9.8

const isHandCloseEnough = (
  hand: Hand,
  width: number,
  height: number,
): Boolean => {
  const handWidth =
    hand.boundingBox.bottomRight[0] - hand.boundingBox.topLeft[0]

  const handHeight =
    hand.boundingBox.bottomRight[1] - hand.boundingBox.topLeft[1]

  return handWidth > width * 0.5 && handHeight > height * 0.5
}

type Props = {
  onThumbsUpDetect: () => void
}

const constraints = {
  facingMode: 'user',
  audio: false,
  // video: { width: VIDEO_SIZE.WIDTH, height: VIDEO_SIZE.HEIGHT },
}

const useRequestWebcamPermission = ({
  onAccepted = (_stream: MediaStream) => {},
  onRefused = () => {},
  onPermissionsChanged = (_boolean: boolean) => {},
}) => {
  useEffect(() => {
    console.log('gfgfd')
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        console.log('fdsfds')
        onPermissionsChanged(true)
        onAccepted(stream)
      })
      .catch(() => {
        onPermissionsChanged(false)
        onRefused()
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

// https://heartbeat.comet.ml/how-to-detect-a-thumbs-up-in-the-browser-with-tensorflow-js-b53fde1bf0f7
// https://codesandbox.io/s/pensive-volhard-tb4tk?file=/src/App.js:378-2057
const HandPoseDetector = ({ onThumbsUpDetect }: Props) => {
  // const webcamRef = useRef<Webcam>(null)
  // const canvasRef = useRef<HTMLCanvasElement>(null)
  // const videoRef = useRef<HTMLVideoElement>(null)
  const webcamRef = useRef<HTMLVideoElement>(null)

  const detectedGestureName = useRef<string>('')
  const lastTimeGestureDetecting = useRef<Date | null>(null)
  const lastTimeGestureDetected = useRef<Date>(new Date())

  const runHandpose = async () => {
    const net = await handpose.load()
    console.log('Handpose model loaded.')

    setInterval(() => {
      detect(net)
    }, 100)
  }

  const detect = async (net: any) => {
    if (webcamRef.current) {
      console.log('detect', detect)
      const video = webcamRef.current

      const videoWidth = video.videoWidth
      const videoHeight = video.videoHeight

      // webcamRef.current.video.width = videoWidth
      // webcamRef.current.video.height = videoHeight

      // canvasRef.current.width = videoWidth
      // canvasRef.current.height = videoHeight

      const hands = await net.estimateHands(video)

      if (hands.length > 0) {
        const hand = hands[0]
        const GE = new fp.GestureEstimator([fp.Gestures.ThumbsUpGesture])
        const { gestures } = await GE.estimate(hand.landmarks, 4)
        if (gestures !== undefined && gestures.length > 0) {
          const detectedGesture = getMostProbableGesture(gestures)

          if (
            detectedGesture &&
            detectedGesture.score > SCORE_THRESHOLD &&
            isHandCloseEnough(hand, videoWidth, videoHeight) &&
            detectedGesture.name === 'thumbs_up'
          ) {
            console.log('detect thumbs_up')
            // if (lastTimeGestureDetecting) {
            // }

            const currentDateTime = new Date()
            const timeDiff =
              currentDateTime.getTime() -
              lastTimeGestureDetected.current.getTime()

            console.log('timeDiff', timeDiff)

            if (timeDiff > 2000) {
              console.log(detectedGesture, hand[0])
              detectedGestureName.current = detectedGesture.name
              lastTimeGestureDetected.current = currentDateTime
              lastTimeGestureDetecting.current = null
              onThumbsUpDetect()
            }
          }
        }
      }
    }
  }

  useRequestWebcamPermission({
    onAccepted: stream => {
      console.log('onAccepted')
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream

        runHandpose()
      }
    },
  })

  return (
    <>
      <video className="hidden" ref={webcamRef} autoPlay />
      {/* <Webcam
        ref={webcamRef}
        width="300"
        height="300"
        videoConstraints={{ facingMode: 'user' }}
      />
      <canvas ref={canvasRef} width="300" height="300" /> */}
    </>
  )
}

export default HandPoseDetector
