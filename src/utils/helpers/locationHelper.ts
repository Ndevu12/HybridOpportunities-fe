import { Location } from "../../lib/job";
import { Region } from "../../lib/enums";

/**
 * Parses a location string and creates a structured Location object
 * @param locationString The location as a string (e.g. "Remote", "Kigali, Rwanda", "Remote (East Africa)")
 * @returns A structured Location object
 */
export function parseLocationString(locationString: string): Location {
  if (!locationString) {
    return {
      isRemote: false,
      displayText: ""
    };
  }
  
  const isRemote = locationString.toLowerCase().includes("remote");
  
  // Extract city and country
  let city: string | undefined;
  let country: string | undefined;
  
  // Try to extract region
  let region: string | undefined;
  Object.values(Region).forEach(r => {
    if (locationString.includes(r)) {
      region = r;
    }
  });
  
  // Parse city and country
  if (locationString.includes(",")) {
    const parts = locationString.split(",").map(part => part.trim());
    // Simple pattern: "City, Country"
    if (parts.length === 2) {
      city = parts[0];
      country = parts[1];
    }
  } else if (!isRemote && locationString.includes("-")) {
    // Handle pattern "City - District"
    const parts = locationString.split("-").map(part => part.trim());
    if (parts.length === 2) {
      city = parts[0];
    }
  } else if (!isRemote && !region) {
    // If not remote and no region detected, it might be just a city
    city = locationString.trim();
  }
  
  return {
    city,
    country,
    region,
    isRemote,
    displayText: locationString.trim()
  };
}

/**
 * Formats a Location object to a display string
 * @param location The Location object
 * @returns A formatted location string
 */
export function formatLocation(location: Location): string {
  if (!location) return "";
  
  if (location.displayText) {
    return location.displayText;
  }
  
  let parts = [];
  
  if (location.isRemote) {
    parts.push("Remote");
    if (location.region) {
      parts.push(`(${location.region})`);
    }
  } else {
    if (location.city) {
      parts.push(location.city);
    }
    
    if (location.country) {
      parts.push(location.country);
    }
  }
  
  return parts.join(", ");
}

/**
 * Determines the location filter category for a location
 * @param value String or Location object
 * @returns Filter category like "Remote Only", region name, or city/country
 */
export function getLocationFilterCategory(value: string | Location | undefined): string {
  let locationData: Location;
  
  if (typeof value === 'string') {
    locationData = parseLocationString(value);
  } else if (value) {
    locationData = value;
  } else {
    return "";
  }
  
  if (locationData.isRemote) {
    return "Remote Only";
  }
  
  if (locationData.region) {
    return locationData.region;
  }
  
  if (locationData.country) {
    return locationData.country;
  }
  
  return locationData.displayText || "";
}