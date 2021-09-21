export type GoogleGeocodingData = {
  status: GoogleGeocodingResponseStatus,
  results: GoogleGeocodingResult[]
}

type GoogleGeocodingResponseStatus = 'OK'
    | 'ZERO_RESULTS'
    | 'OVER_DAILY_LIMIT'
    | 'OVER_QUERY_LIMIT'
    | 'REQUEST_DENIED'
    | 'INVALID_REQUEST'
    | 'UNKNOWN_ERROR';

type GoogleGeocodingResult = {
  geometry: {
    location: {
      lat: number;
      lng: number;
    }
  }
}
