const DATE_UNITS = [
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
]

const getDateDiffs =  (timestamp) => {
    const now = Date.now()
    const elapsed = (timestamp - now) / 1000

    for (const [unit, secondUnit] of DATE_UNITS){
        if(Math.abs(elapsed) > secondUnit || unit === 'second'){
            const value = Math.round(elapsed / secondUnit)
            return { value, unit }
        }
    }
}

const useTimeAgo = ( timestamp) => {
    const { value, unit } = getDateDiffs(timestamp)
    const rtf = new Intl.RelativeTimeFormat('es', {
        style: 'short'
    })
    return rtf.format(value, unit)
}

export default useTimeAgo