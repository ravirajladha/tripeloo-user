'use client'

import React, { FC, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface AvailabilityData {
  date: string;
  available_rooms: number;
  price: number;
}

interface SectionDateRangeProps {
  availability: AvailabilityData[];
  defaultPrice: number;
  defaultRooms: number;
}

const SectionDateRange: FC<SectionDateRangeProps> = ({ availability, defaultPrice, defaultRooms }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date())

  console.log(defaultPrice, "defaultPrice");

  // Convert availability array to a Map for quick lookup
  const availabilityMap = new Map(
    availability.map((item) => [new Date(item.date).toDateString(), item])
  )

  // Function to render custom day contents
  const renderDayContents = (day: number, date: Date) => {
    const dateStr = date.toDateString()
    const specialDate = availabilityMap.get(dateStr)

    return (
      <div className="availability-day">
        <span className="day-number">{day}</span>

        {/* Price and Room Count */}
        {specialDate ? (
          <>
            <span className="special-price">₹{specialDate.price}</span>
            <span className="special-rooms">{specialDate.available_rooms} Rooms</span>
          </>
        ) : (
          <>
            <span className="default-price">₹{defaultPrice}</span>
            <span className="default-rooms">{defaultRooms} Rooms</span>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="availability-calendar-container">
      {/* HEADER */}
      <div>
        <h2 className="availability-title">Availability</h2>
        <span className="availability-subtitle">Prices may increase on weekends or holidays</span>
      </div>
      <div className="divider"></div>

      {/* SCOPED FULL-WIDTH CALENDAR (ONLY FOR SECTIONDATERANGE) */}
      <div className="availability-datepicker-wrapper">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          inline
          monthsShown={1} // ✅ Shows two months stacked vertically
          showPopperArrow={false}
          minDate={new Date()}  // ✅ Block past dates
          renderDayContents={renderDayContents}
          calendarClassName="availability-datepicker"
          wrapperClassName="availability-datepicker-wrapper"
        />
      </div>
    </div>
  )
}

export default SectionDateRange
