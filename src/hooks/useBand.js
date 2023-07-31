import { useState } from 'react'

export const useBand = (band) => {
    const [band, setBand] = useState(null)
    setBand(band)
    return {band}
}