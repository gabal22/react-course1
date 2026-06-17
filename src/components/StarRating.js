import { useState } from "react";
import PropTypes from "prop-types";

const containerStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '.7em',
  margin: '.7em 0'
}

const starsContainer = {
  display: 'flex'
}

const StarRating = ({
    maxRating= 5,
    color= '#3d71ff',
    size= 21,
    defaultRating= 0,
    onSetRating
  }) => {
  const [rating, setRating] = useState(defaultRating)
  const [tempRating, setTempRating] = useState(0)

  const handleRating = (rating) => {
    setRating(rating + 1)
    onSetRating && onSetRating(rating + 1)
  }

  return (
    <div style={containerStyles}>
      <div style={starsContainer}>{
        [...Array(maxRating).keys()].map(star => (
          <Star
            key={star}
            onClick={() => handleRating(star)}
            selected={tempRating ? star + 1 <= tempRating : star + 1 <= rating }
            hover={() => setTempRating(star + 1)}
            onLeave={() => setTempRating(0)}
            color={color}
            size={size}
            />
        ))
      }</div>
      <span style={{ fontSize: `${size / 1.8}px` }}>{tempRating || rating || ''}</span>
    </div>
  )
}

const Star = ({ onClick, selected, hover, onLeave, color, size }) =>{
  const starStyles = {
    width: `${size}px`,
    height: `${size}px`,
    display: 'block',
    cursor: 'pointer'
  }
  return (
    <span style={starStyles} onClick={onClick} onMouseEnter={hover} onMouseLeave={onLeave}>
       <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={selected ? color : "none"}
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
    </span>
  )
}

StarRating.propTypes = {
  maxRating: PropTypes.number.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  defaultRating: PropTypes.number,
  onSetRating: PropTypes.func
}

Star.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  hover: PropTypes.func,
  onLeave: PropTypes.func,
  color: PropTypes.string,
  size: PropTypes.number
}

export default StarRating
