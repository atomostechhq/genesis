"use client";
import React, { useRef, useState } from "react";
import Input from "./Input";

interface OTPInputProps {
  length: number;
  onChange: (otp: string) => void;
  type?: "text" | "password" | "number";
}

const OTPInput: React.FC<OTPInputProps> = ({
  length,
  onChange,
  type = "text",
}) => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    let value = e.target.value;
    if (type === "number") value = value.replace(/\D/g, "");
    if (!value) return;

    const newOtp = [...otpValues];
    newOtp[idx] = value[0];
    setOtpValues(newOtp);
    onChange(newOtp.join(""));

    if (idx < length - 1) inputsRef.current[idx + 1]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace") {
      if (otpValues[idx]) {
        const newOtp = [...otpValues];
        newOtp[idx] = "";
        setOtpValues(newOtp);
        onChange(newOtp.join(""));
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    let pasteData = e.clipboardData.getData("Text");
    if (type === "number") pasteData = pasteData.replace(/\D/g, "");
    const newOtp = pasteData
      .split("")
      .concat(Array(length).fill(""))
      .slice(0, length);
    setOtpValues(newOtp);
    onChange(newOtp.join(""));
    inputsRef.current[Math.min(pasteData.length, length - 1)]?.focus();
  };

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length }).map((_, idx) => (
        <Input
          key={idx}
          type={type}
          inputMode={type === "number" ? "numeric" : "text"}
          maxLength={1}
          value={otpValues[idx]}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onPaste={handlePaste}
          ref={(el) => {
            inputsRef.current[idx] = el ?? null;
          }}
          className="w-[40px] p-3.5"
        />
      ))}
    </div>
  );
};

export default OTPInput;
