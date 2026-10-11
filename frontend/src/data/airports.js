// Top 60 US airports (IATA → metadata)
export const AIRPORTS = [
  { code: 'ATL', city: 'Atlanta', state: 'GA', name: 'Hartsfield-Jackson', lat: 33.6407, lon: -84.4277, tz: 'America/New_York' },
  { code: 'LAX', city: 'Los Angeles', state: 'CA', name: 'Los Angeles Intl', lat: 33.9416, lon: -118.4085, tz: 'America/Los_Angeles' },
  { code: 'ORD', city: 'Chicago', state: 'IL', name: "O'Hare Intl", lat: 41.9742, lon: -87.9073, tz: 'America/Chicago' },
  { code: 'DFW', city: 'Dallas', state: 'TX', name: 'Dallas/Fort Worth', lat: 32.8998, lon: -97.0403, tz: 'America/Chicago' },
  { code: 'DEN', city: 'Denver', state: 'CO', name: 'Denver Intl', lat: 39.8561, lon: -104.6737, tz: 'America/Denver' },
  { code: 'JFK', city: 'New York', state: 'NY', name: 'John F. Kennedy', lat: 40.6413, lon: -73.7781, tz: 'America/New_York' },
  { code: 'SFO', city: 'San Francisco', state: 'CA', name: 'San Francisco Intl', lat: 37.6213, lon: -122.3790, tz: 'America/Los_Angeles' },
  { code: 'SEA', city: 'Seattle', state: 'WA', name: 'Seattle-Tacoma', lat: 47.4502, lon: -122.3088, tz: 'America/Los_Angeles' },
  { code: 'LAS', city: 'Las Vegas', state: 'NV', name: 'Harry Reid Intl', lat: 36.0840, lon: -115.1537, tz: 'America/Los_Angeles' },
  { code: 'MCO', city: 'Orlando', state: 'FL', name: 'Orlando Intl', lat: 28.4312, lon: -81.3081, tz: 'America/New_York' },
  { code: 'MIA', city: 'Miami', state: 'FL', name: 'Miami Intl', lat: 25.7959, lon: -80.2870, tz: 'America/New_York' },
  { code: 'PHX', city: 'Phoenix', state: 'AZ', name: 'Sky Harbor', lat: 33.4342, lon: -112.0116, tz: 'America/Phoenix' },
  { code: 'IAH', city: 'Houston', state: 'TX', name: 'George Bush Intercont.', lat: 29.9902, lon: -95.3368, tz: 'America/Chicago' },
  { code: 'BOS', city: 'Boston', state: 'MA', name: 'Logan Intl', lat: 42.3656, lon: -71.0096, tz: 'America/New_York' },
  { code: 'MSP', city: 'Minneapolis', state: 'MN', name: 'St. Paul Intl', lat: 44.8848, lon: -93.2223, tz: 'America/Chicago' },
  { code: 'FLL', city: 'Fort Lauderdale', state: 'FL', name: 'Hollywood Intl', lat: 26.0742, lon: -80.1506, tz: 'America/New_York' },
  { code: 'DTW', city: 'Detroit', state: 'MI', name: 'Metro Wayne County', lat: 42.2162, lon: -83.3554, tz: 'America/New_York' },
  { code: 'PHL', city: 'Philadelphia', state: 'PA', name: 'Philadelphia Intl', lat: 39.8744, lon: -75.2424, tz: 'America/New_York' },
  { code: 'LGA', city: 'New York', state: 'NY', name: 'LaGuardia', lat: 40.7769, lon: -73.8740, tz: 'America/New_York' },
  { code: 'BWI', city: 'Baltimore', state: 'MD', name: 'BWI Marshall', lat: 39.1774, lon: -76.6684, tz: 'America/New_York' },
  { code: 'SLC', city: 'Salt Lake City', state: 'UT', name: 'Salt Lake City Intl', lat: 40.7899, lon: -111.9791, tz: 'America/Denver' },
  { code: 'SAN', city: 'San Diego', state: 'CA', name: 'San Diego Intl', lat: 32.7338, lon: -117.1933, tz: 'America/Los_Angeles' },
  { code: 'IAD', city: 'Washington', state: 'DC', name: 'Dulles Intl', lat: 38.9531, lon: -77.4565, tz: 'America/New_York' },
  { code: 'DCA', city: 'Washington', state: 'DC', name: 'Reagan National', lat: 38.8512, lon: -77.0402, tz: 'America/New_York' },
  { code: 'MDW', city: 'Chicago', state: 'IL', name: 'Midway Intl', lat: 41.7868, lon: -87.7522, tz: 'America/Chicago' },
  { code: 'TPA', city: 'Tampa', state: 'FL', name: 'Tampa Intl', lat: 27.9755, lon: -82.5332, tz: 'America/New_York' },
  { code: 'PDX', city: 'Portland', state: 'OR', name: 'Portland Intl', lat: 45.5898, lon: -122.5951, tz: 'America/Los_Angeles' },
  { code: 'STL', city: 'St. Louis', state: 'MO', name: 'Lambert Intl', lat: 38.7487, lon: -90.3700, tz: 'America/Chicago' },
  { code: 'MCI', city: 'Kansas City', state: 'MO', name: 'Kansas City Intl', lat: 39.2976, lon: -94.7139, tz: 'America/Chicago' },
  { code: 'AUS', city: 'Austin', state: 'TX', name: 'Austin-Bergstrom', lat: 30.1975, lon: -97.6664, tz: 'America/Chicago' },
  { code: 'BNA', city: 'Nashville', state: 'TN', name: 'Nashville Intl', lat: 36.1263, lon: -86.6774, tz: 'America/Chicago' },
  { code: 'RDU', city: 'Raleigh', state: 'NC', name: 'Raleigh-Durham', lat: 35.8801, lon: -78.7880, tz: 'America/New_York' },
  { code: 'CLE', city: 'Cleveland', state: 'OH', name: 'Hopkins Intl', lat: 41.4117, lon: -81.8498, tz: 'America/New_York' },
  { code: 'CMH', city: 'Columbus', state: 'OH', name: 'John Glenn Intl', lat: 39.9980, lon: -82.8919, tz: 'America/New_York' },
  { code: 'IND', city: 'Indianapolis', state: 'IN', name: 'Indianapolis Intl', lat: 39.7173, lon: -86.2944, tz: 'America/New_York' },
  { code: 'MKE', city: 'Milwaukee', state: 'WI', name: 'Mitchell Intl', lat: 42.9472, lon: -87.8966, tz: 'America/Chicago' },
  { code: 'SAT', city: 'San Antonio', state: 'TX', name: 'San Antonio Intl', lat: 29.5337, lon: -98.4698, tz: 'America/Chicago' },
  { code: 'SMF', city: 'Sacramento', state: 'CA', name: 'Sacramento Intl', lat: 38.6954, lon: -121.5908, tz: 'America/Los_Angeles' },
  { code: 'SJC', city: 'San Jose', state: 'CA', name: 'Mineta San Jose', lat: 37.3639, lon: -121.9289, tz: 'America/Los_Angeles' },
  { code: 'OAK', city: 'Oakland', state: 'CA', name: 'Oakland Intl', lat: 37.7213, lon: -122.2207, tz: 'America/Los_Angeles' },
  { code: 'HNL', city: 'Honolulu', state: 'HI', name: 'Daniel K. Inouye', lat: 21.3187, lon: -157.9224, tz: 'Pacific/Honolulu' },
  { code: 'MSY', city: 'New Orleans', state: 'LA', name: 'Louis Armstrong', lat: 29.9934, lon: -90.2580, tz: 'America/Chicago' },
  { code: 'JAX', city: 'Jacksonville', state: 'FL', name: 'Jacksonville Intl', lat: 30.4941, lon: -81.6879, tz: 'America/New_York' },
  { code: 'RSW', city: 'Fort Myers', state: 'FL', name: 'Southwest Florida', lat: 26.5362, lon: -81.7552, tz: 'America/New_York' },
  { code: 'PIT', city: 'Pittsburgh', state: 'PA', name: 'Pittsburgh Intl', lat: 40.4915, lon: -80.2329, tz: 'America/New_York' },
  { code: 'CVG', city: 'Cincinnati', state: 'OH', name: 'Northern Kentucky', lat: 39.0488, lon: -84.6678, tz: 'America/New_York' },
  { code: 'ABQ', city: 'Albuquerque', state: 'NM', name: 'Sunport Intl', lat: 35.0402, lon: -106.6092, tz: 'America/Denver' },
  { code: 'OMA', city: 'Omaha', state: 'NE', name: 'Eppley Airfield', lat: 41.3032, lon: -95.8941, tz: 'America/Chicago' },
  { code: 'RNO', city: 'Reno', state: 'NV', name: 'Reno-Tahoe Intl', lat: 39.4991, lon: -119.7681, tz: 'America/Los_Angeles' },
  { code: 'BOI', city: 'Boise', state: 'ID', name: 'Boise Air Terminal', lat: 43.5644, lon: -116.2228, tz: 'America/Boise' },
  { code: 'TUL', city: 'Tulsa', state: 'OK', name: 'Tulsa Intl', lat: 36.1984, lon: -95.8881, tz: 'America/Chicago' },
  { code: 'OKC', city: 'Oklahoma City', state: 'OK', name: 'Will Rogers World', lat: 35.3931, lon: -97.6007, tz: 'America/Chicago' },
  { code: 'LIT', city: 'Little Rock', state: 'AR', name: 'Clinton National', lat: 34.7294, lon: -92.2243, tz: 'America/Chicago' },
  { code: 'MEM', city: 'Memphis', state: 'TN', name: 'Memphis Intl', lat: 35.0424, lon: -89.9767, tz: 'America/Chicago' },
  { code: 'BHM', city: 'Birmingham', state: 'AL', name: 'Shuttlesworth Intl', lat: 33.5629, lon: -86.7535, tz: 'America/Chicago' },
  { code: 'GSP', city: 'Greenville', state: 'SC', name: 'Spartanburg Intl', lat: 34.8957, lon: -82.2189, tz: 'America/New_York' },
  { code: 'CHS', city: 'Charleston', state: 'SC', name: 'Charleston Intl', lat: 32.8986, lon: -80.0405, tz: 'America/New_York' },
  { code: 'SAV', city: 'Savannah', state: 'GA', name: 'Hilton Head Intl', lat: 32.1276, lon: -81.2021, tz: 'America/New_York' },
  { code: 'PVD', city: 'Providence', state: 'RI', name: 'T.F. Green', lat: 41.7240, lon: -71.4283, tz: 'America/New_York' },
  { code: 'BDL', city: 'Hartford', state: 'CT', name: 'Bradley Intl', lat: 41.9389, lon: -72.6832, tz: 'America/New_York' },
  { code: 'BUF', city: 'Buffalo', state: 'NY', name: 'Niagara Intl', lat: 42.9405, lon: -78.7322, tz: 'America/New_York' },
];

// Fast lookup
export const AIRPORTS_BY_CODE = Object.fromEntries(
  AIRPORTS.map((a) => [a.code, a])
);

// Haversine distance (miles)
export function distanceMiles(codeA, codeB) {
  const A = AIRPORTS_BY_CODE[codeA];
  const B = AIRPORTS_BY_CODE[codeB];
  if (!A || !B) return null;

  const toRad = (d) => (d * Math.PI) / 180;
  const R = 3958.8; // Earth radius in miles
  const dLat = toRad(B.lat - A.lat);
  const dLon = toRad(B.lon - A.lon);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(A.lat)) * Math.cos(toRad(B.lat)) * Math.sin(dLon / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(a)));
}

// Lookup helpers
export function airportLabel(code) {
  const a = AIRPORTS_BY_CODE[code?.toUpperCase()];
  return a ? `${a.code} — ${a.city}, ${a.state}` : '';
}