import { useState, useEffect, useRef } from 'react'

export default function PriceRangeSlider({ min, max, value, onChange }) {
    const [localValue, setLocalValue] = useState(value)
    const [isDragging, setIsDragging] = useState(null)
    const sliderRef = useRef(null)

    useEffect(() => {
        setLocalValue(value)
    }, [value])

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price)
    }

    const getPercentage = (val) => {
        return ((val - min) / (max - min)) * 100
    }

    const handleMouseDown = (thumb) => (e) => {
        e.preventDefault()
        setIsDragging(thumb)
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    const handleTouchStart = (thumb) => (e) => {
        e.preventDefault()
        setIsDragging(thumb)
        document.addEventListener('touchmove', handleTouchMove, { passive: false })
        document.addEventListener('touchend', handleTouchEnd)
    }

    const calculateValue = (clientX) => {
        if (!sliderRef.current) return

        const rect = sliderRef.current.getBoundingClientRect()
        const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
        return Math.round(min + (percentage / 100) * (max - min))
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return

        const newValue = calculateValue(e.clientX)
        updateValue(newValue)
    }

    const handleTouchMove = (e) => {
        if (!isDragging) return
        e.preventDefault()

        const touch = e.touches[0]
        const newValue = calculateValue(touch.clientX)
        updateValue(newValue)
    }

    const updateValue = (newValue) => {
        if (isDragging === 'min') {
            const newMin = Math.min(newValue, localValue.max - 100)
            const updatedValue = { ...localValue, min: Math.max(min, newMin) }
            setLocalValue(updatedValue)
        } else if (isDragging === 'max') {
            const newMax = Math.max(newValue, localValue.min + 100)
            const updatedValue = { ...localValue, max: Math.min(max, newMax) }
            setLocalValue(updatedValue)
        }
    }

    const handleMouseUp = () => {
        setIsDragging(null)
        onChange(localValue)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }

    const handleTouchEnd = () => {
        setIsDragging(null)
        onChange(localValue)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
    }

    const minPercentage = getPercentage(localValue.min)
    const maxPercentage = getPercentage(localValue.max)

    return (
        <div className="space-y-4">
            {/* Price Display */}
            <div className="flex items-center justify-between text-sm">
                <div className="bg-[#F5F1E8] px-3 py-2 rounded-xl">
                    <span className="text-[#8B5E3C] text-price">
                        {formatPrice(localValue.min)}
                    </span>
                </div>
                <div className="text-[#A0956B] text-body">to</div>
                <div className="bg-[#F5F1E8] px-3 py-2 rounded-xl">
                    <span className="text-[#8B5E3C] text-price">
                        {formatPrice(localValue.max)}
                    </span>
                </div>
            </div>

            {/* Slider */}
            <div className="relative px-2">
                <div
                    ref={sliderRef}
                    className="relative h-2 bg-[#E8E2D4] rounded-full cursor-pointer"
                >
                    {/* Active Range */}
                    <div
                        className="absolute h-2 bg-gradient-to-r from-[#8B5E3C] to-[#6B8E23] rounded-full"
                        style={{
                            left: `${minPercentage}%`,
                            width: `${maxPercentage - minPercentage}%`,
                        }}
                    />

                    {/* Min Thumb */}
                    <div
                        className={`absolute w-6 h-6 bg-white border-2 border-[#8B5E3C] rounded-full shadow-lg cursor-grab transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 ${isDragging === 'min' ? 'scale-110 shadow-xl border-[#6B4423]' : ''
                            }`}
                        style={{
                            left: `${minPercentage}%`,
                            top: '50%',
                        }}
                        onMouseDown={handleMouseDown('min')}
                        onTouchStart={handleTouchStart('min')}
                    >
                        <div className="absolute inset-1 bg-[#8B5E3C] rounded-full" />
                    </div>

                    {/* Max Thumb */}
                    <div
                        className={`absolute w-6 h-6 bg-white border-2 border-[#8B5E3C] rounded-full shadow-lg cursor-grab transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 ${isDragging === 'max' ? 'scale-110 shadow-xl border-[#6B4423]' : ''
                            }`}
                        style={{
                            left: `${maxPercentage}%`,
                            top: '50%',
                        }}
                        onMouseDown={handleMouseDown('max')}
                        onTouchStart={handleTouchStart('max')}
                    >
                        <div className="absolute inset-1 bg-[#8B5E3C] rounded-full" />
                    </div>
                </div>

                {/* Price Labels */}
                <div className="flex justify-between mt-2 text-xs text-[#A0956B] text-body">
                    <span>{formatPrice(min)}</span>
                    <span>{formatPrice(max)}</span>
                </div>
            </div>

            {/* Discount Indicator */}
            <div className="text-xs text-[#6B8E23] bg-[#6B8E23]/10 px-3 py-2 rounded-xl text-body">
                💰 Products with MRP show original price crossed out
            </div>
        </div>
    )
}