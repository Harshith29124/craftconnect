import React, { useState, useRef } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const VoiceRecorder = ({ onAnalysisComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      console.log("starting line")
      setError('');
      
      // Check if MediaRecorder is supported
      if (!window.MediaRecorder) {
        setError('Your browser does not support audio recording. Please try a modern browser like Chrome, Firefox, or Edge.');
        return;
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({
        
        audio: {
          sampleRate: 48000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        }
      });
      console.log(stream)

      console.log("before media ref");
      
      // Check for supported MIME types
      let mimeType = 'audio/webm;codecs=opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'audio/webm';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = 'audio/mp4';
          if (!MediaRecorder.isTypeSupported(mimeType)) {
            mimeType = ''; // Use default
          }
        }
      }
      
      console.log('Using MIME type:', mimeType);
      mediaRecorderRef.current = new MediaRecorder(stream, mimeType ? { mimeType } : {});
      audioChunksRef.current = [];

      console.log("after media ref");
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      console.log("after ondataavailable");
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType || 'audio/webm' });
        await processAudio(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      console.log("after onstop");
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      
      let errorMessage = 'Unable to access microphone. ';
      
      if (error.name === 'NotAllowedError') {
        errorMessage += 'Please allow microphone access in your browser settings and refresh the page.';
      } else if (error.name === 'NotFoundError') {
        errorMessage += 'No microphone found. Please connect a microphone and try again.';
      } else if (error.name === 'NotSupportedError') {
        errorMessage += 'Your browser does not support audio recording. Please try a different browser.';
      } else {
        errorMessage += 'Please check your permissions and try again.';
      }
      
      setError(errorMessage);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
    }
  };

  const processAudio = async (audioBlob) => {
    try {
      setError('');
      const formData = new FormData();
      formData.append('audio', audioBlob, 'voice-input.webm');

      const response = await axios.post(API_ENDPOINTS.AI_ANALYSIS, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setTranscript(response.data.transcription);
        onAnalysisComplete(response.data.analysis);
      } else {
        setError('Analysis failed. Please try again.');
      }
    } catch (error) {
      console.error('Error processing audio:', error);
      setError('Failed to process audio. Please check your connection and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="text-center flex flex-col items-center">
      <div className="mb-10 flex items-center justify-center w-full">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          className="group relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:opacity-50"
        >
          <span className="absolute h-full w-full animate-ping rounded-full bg-primary opacity-20"></span>
          <svg fill="currentColor" height="40" width="40" viewBox="0 0 256 256">
            <path d="M128,176a48.05,48.05,0,0,0,48-48V64a48,48,0,0,0-96,0v64A48.05,48.05,0,0,0,128,176ZM96,64a32,32,0,0,1,64,0v64a32,32,0,0,1-64,0Zm40,143.6V232a8,8,0,0,1-16,0V207.6A80.11,80.11,0,0,1,48,128a8,8,0,0,1,16,0,64,64,0,0,0,128,0,8,8,0,0,1,16,0A80.11,80.11,0,0,1,136,207.6Z" />
          </svg>
        </button>

        {isRecording && (
          <div className="listening-bar mt-4">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-text-secondary">
          {isProcessing ? 'Processing your voice...'
            : isRecording ? 'Recording... Click to stop'
            : 'Click to start recording'}
        </p>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
            {error.includes('NotAllowedError') && (
              <div className="mt-3 text-xs text-red-500">
                <p className="font-semibold mb-1">To enable microphone access:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Click the microphone icon in your browser's address bar</li>
                  <li>Select "Allow" for microphone access</li>
                  <li>Refresh this page and try again</li>
                </ul>
              </div>
            )}
            <button 
              onClick={() => setError('')} 
              className="mt-2 text-xs text-red-500 hover:text-red-700 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {transcript && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-border-color">
            <p className="text-sm text-text-secondary">Transcript:</p>
            <p className="text-text-primary font-medium">{transcript}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;


