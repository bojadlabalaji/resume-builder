'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { useResume } from '@/context/ResumeContext';

interface EditableFieldProps {
    value: string;
    onSave: (newValue: string) => void;
    placeholder?: string;
    className?: string;
    multiline?: boolean;
    tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const EditableField: React.FC<EditableFieldProps> = ({
    value,
    onSave,
    placeholder = 'Click to edit',
    className = '',
    multiline = false,
    tagName = 'div'
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleBlur = () => {
        setIsEditing(false);
        if (currentValue !== value) {
            onSave(currentValue);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !multiline) {
            handleBlur();
        }
        if (e.key === 'Escape') {
            setCurrentValue(value);
            setIsEditing(false);
        }
    };

    const { setResumeData } = useResume(); // We might need whole resume content later

    // AI Refine State
    const [showAiMenu, setShowAiMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const [selectedText, setSelectedText] = useState('');
    const [isRefining, setIsRefining] = useState(false);
    const [aiInput, setAiInput] = useState('');
    const [showAiInput, setShowAiInput] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleSelection = () => {
            // Only handle selection if NOT in editing mode and NO active AI input
            if (isEditing || showAiInput) return;

            const selection = window.getSelection();
            if (selection && selection.toString().trim().length > 0 && containerRef.current?.contains(selection.anchorNode)) {
                const range = selection.getRangeAt(0);
                const rect = range.getBoundingClientRect();

                // Position menu above selection
                setMenuPosition({
                    top: rect.top - 40 + window.scrollY,
                    left: rect.left + rect.width / 2 - 50 // center it
                });
                setSelectedText(selection.toString());
                setShowAiMenu(true);
            } else {
                setShowAiMenu(false);
            }
        };

        document.addEventListener('selectionchange', handleSelection);
        return () => document.removeEventListener('selectionchange', handleSelection);
    }, [isEditing, showAiInput]);


    const handleAiRefine = async () => {
        setIsRefining(true);
        try {
            // Import dynamically to avoid circular deps if any in future, strictly standard here
            const { refineText } = await import('@/services/resumeService');

            const result = await refineText({
                original_text: selectedText,
                instruction: aiInput,
                context: value // Sending the whole field value as context
            });

            // Replace text logic (naive replace for V1)
            // In a real editor, we'd use range replacement. 
            // For now, if they selected a substring, we replace just that substring in the VALUE.
            const newValue = value.replace(selectedText, result.refined_text);
            onSave(newValue);

            // Reset
            setShowAiInput(false);
            setShowAiMenu(false);
            setAiInput('');
        } catch (error) {
            console.error("AI Refine failed", error);
            alert("Failed to refine text");
        } finally {
            setIsRefining(false);
        }
    };

    if (isEditing) {
        if (multiline) {
            return (
                <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className={`w-full bg-transparent border border-blue-500 rounded px-1 outline-none resize-none ${className}`}
                    placeholder={placeholder}
                    rows={currentValue.split('\n').length || 1}
                />
            );
        }
        return (
            <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`w-full bg-transparent border border-blue-500 rounded px-1 outline-none ${className}`}
                placeholder={placeholder}
            />
        );
    }

    if (isEditing) {
        if (multiline) {
            return (
                <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className={`w-full bg-transparent border border-blue-500 rounded px-1 outline-none resize-none ${className}`}
                    placeholder={placeholder}
                    rows={currentValue.split('\n').length || 1}
                />
            );
        }
        return (
            <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`w-full bg-transparent border border-blue-500 rounded px-1 outline-none ${className}`}
                placeholder={placeholder}
            />
        );
    }

    const Tag = tagName as any;

    return (
        <div ref={containerRef} className="relative group/field inline-block w-full">
            {/* Floating AI Menu */}
            {(showAiMenu || showAiInput) && (
                <div
                    className="fixed z-50 bg-[#1a1a1a] text-white rounded-lg shadow-xl border border-[#2f2f2f] flex items-center p-1 animate-in fade-in zoom-in-95 duration-200"
                    style={{ top: menuPosition.top, left: menuPosition.left }}
                >
                    {!showAiInput ? (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowAiInput(true);
                            }}
                            className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#2f2f2f] rounded-md transition-colors text-sm font-medium"
                        >
                            <Sparkles className="w-4 h-4 text-[#FFD600]" />
                            Improve
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 p-1">
                            <input
                                autoFocus
                                value={aiInput}
                                onChange={(e) => setAiInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAiRefine()}
                                placeholder="How to improve? (e.g. 'Make concise')"
                                className="bg-[#2f2f2f] border-none text-white text-sm rounded px-2 py-1 focus:ring-1 focus:ring-[#FFD600] outline-none w-64"
                            />
                            <button
                                onClick={handleAiRefine}
                                disabled={isRefining}
                                className="bg-[#FFD600] text-black px-3 py-1 rounded text-xs font-bold hover:bg-[#ffe033] disabled:opacity-50"
                            >
                                {isRefining ? '...' : 'Go'}
                            </button>
                        </div>
                    )}
                </div>
            )}

            <Tag
                onClick={() => setIsEditing(true)}
                className={`cursor-text hover:bg-gray-100/50 rounded px-1 -mx-1 transition-colors border border-transparent hover:border-gray-200 ${className}`}
                title="Click to edit, Select to improve"
            >
                {value || <span className="text-gray-400 italic">{placeholder}</span>}
            </Tag>
        </div>
    );
};
