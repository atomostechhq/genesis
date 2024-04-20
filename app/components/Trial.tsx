import React, { InputHTMLAttributes } from 'react'

interface TrialProps extends Omit<InputHTMLAttributes<HTMLInputElement>, ""> {
  onFileSelect?: (files: File[]) => void;
}

const Trial = ({}:TrialProps) => {
  return (
    <div></div>
  )
}

export default Trial