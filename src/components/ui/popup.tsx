import React from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Button } from "./button";

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "error" | "info";
  title: string;
  message: string;
  showCloseButton?: boolean;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export function Popup({
  isOpen,
  onClose,
  type,
  title,
  message,
  showCloseButton = true,
  autoClose = false,
  autoCloseDelay = 3000,
}: PopupProps) {
  React.useEffect(() => {
    if (autoClose && isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case "error":
        return <AlertCircle className="h-6 w-6 text-red-600" />;
      case "info":
        return <Info className="h-6 w-6 text-blue-600" />;
      default:
        return <Info className="h-6 w-6 text-blue-600" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  const getTitleColor = () => {
    switch (type) {
      case "success":
        return "text-green-800";
      case "error":
        return "text-red-800";
      case "info":
        return "text-blue-800";
      default:
        return "text-blue-800";
    }
  };

  const getMessageColor = () => {
    switch (type) {
      case "success":
        return "text-green-700";
      case "error":
        return "text-red-700";
      case "info":
        return "text-blue-700";
      default:
        return "text-blue-700";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className={`relative w-full max-w-md rounded-lg border p-6 shadow-lg ${getBackgroundColor()} animate-in fade-in-0 zoom-in-95 duration-200`}>
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {getIcon()}
            <h3 className={`text-lg font-semibold ${getTitleColor()}`}>
              {title}
            </h3>
          </div>
          {showCloseButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-black hover:bg-opacity-10"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {/* Message */}
        <div className="mt-4">
          <p className={`text-sm ${getMessageColor()}`}>
            {message}
          </p>
        </div>
        
        {/* Action Button */}
        <div className="mt-6 flex justify-end">
          <Button
            onClick={onClose}
            className={`${
              type === "success"
                ? "bg-green-600 hover:bg-green-700"
                : type === "error"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {type === "success" ? "Great!" : "Got it"}
          </Button>
        </div>
      </div>
    </div>
  );
}
