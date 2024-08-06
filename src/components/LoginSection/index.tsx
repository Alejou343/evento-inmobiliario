"use client"
import React from 'react'

interface ComponentProps {
    id: string
    placeholder: string 
    label: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
    type: string
    className: { div: string, input: string, label: string }
    defaultValue: string
    value?: string
}

const Index: React.FC<ComponentProps> = ({id, placeholder, label, onChange, type, className, value, defaultValue}) => {

    return (
        <div className={`mb-2 ${className?.div}`}>
            <label htmlFor={id} className={`form-label text-secondary font-semibold ${className?.label}`}>{label}</label>
            <div className="relative">
                <input 
                    type={type}
                    className={`${className?.input} h-9 px-3 rounded-lg placeholder:text-sm`}
                    aria-describedby="inputGroupPrepend"
                    id={id} 
                    placeholder={placeholder}
                    onChange={onChange}
                    min={100}
                    max={800}
                    defaultValue={defaultValue}
                    required
                />
            </div>
        </div>
    )
}

export default Index