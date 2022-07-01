import React from 'react'
import {parseISO, formatDistanceToNowStrict} from 'date-fns'
const TimeAgo = ({timeStamp}) => {
    /*--- variables ---*/
        let TimeAgo = ''
    /*--- functions ---*/
    if(timeStamp){
        const date = parseISO(timeStamp)
        const timePeriod = formatDistanceToNowStrict(date)
        TimeAgo = `${timePeriod} ago`
    }

  return (
    <span title={timeStamp}>
      &nbsp; <i>{TimeAgo}</i>
      </span>
  )
}

export default TimeAgo
