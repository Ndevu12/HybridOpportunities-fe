import { SalaryRange } from "../../lib/job";

/**
 * Converts a string salary range (e.g. "$80,000 - $100,000") to a structured SalaryRange object
 * @param salaryString The salary range as a string
 * @returns A structured SalaryRange object
 */
export function parseSalaryString(salaryString: string): SalaryRange | null {
  if (!salaryString) return null;

  // Handle different formats
  // Format 1: "$80,000 - $100,000"
  // Format 2: "$50K-$100K"
  // Format 3: "Up to $80,000"
  // Format 4: "From $50,000"
  
  try {
    let min = 0;
    let max = 0;
    const currency = salaryString.includes("$") ? "$" : ""; // Default to $ but can be expanded
    
    // Format 2 (simplified K notation)
    if (salaryString.includes("K")) {
      const parts = salaryString.replace(/[$,\s]/g, "").split("-");
      if (parts.length === 2) {
        min = parseInt(parts[0].replace("K", "")) * 1000;
        max = parseInt(parts[1].replace("K", "")) * 1000;
      }
    } 
    // Format 1 (full numbers)
    else if (salaryString.includes("-")) {
      const parts = salaryString.replace(/[$,\s]/g, "").split("-");
      if (parts.length === 2) {
        min = parseInt(parts[0]);
        max = parseInt(parts[1]);
      }
    }
    // Format 3 (up to X)
    else if (salaryString.toLowerCase().includes("up to")) {
      max = parseInt(salaryString.replace(/[$,\s]/g, "").replace(/[^\d]/g, ""));
    }
    // Format 4 (from X)
    else if (salaryString.toLowerCase().includes("from")) {
      min = parseInt(salaryString.replace(/[$,\s]/g, "").replace(/[^\d]/g, ""));
    }
    // Just a number
    else {
      const value = parseInt(salaryString.replace(/[$,\s]/g, ""));
      min = value;
      max = value;
    }
    
    return {
      min,
      max,
      currency,
      displayText: salaryString
    };
  } catch (error) {
    console.error("Error parsing salary string:", error);
    return null;
  }
}

/**
 * Formats a salary range object to a consistent display string
 * @param range The SalaryRange object
 * @returns A formatted salary string
 */
export function formatSalaryRange(range: SalaryRange): string {
  if (!range) return "";
  
  if (range.min === 0 && range.max > 0) {
    return `Up to ${range.currency}${formatNumberWithK(range.max)}`;
  }
  
  if (range.min > 0 && range.max === 0) {
    return `From ${range.currency}${formatNumberWithK(range.min)}`;
  }
  
  if (range.min === range.max) {
    return `${range.currency}${formatNumberWithK(range.min)}`;
  }
  
  return `${range.currency}${formatNumberWithK(range.min)} - ${range.currency}${formatNumberWithK(range.max)}`;
}

/**
 * Helper to format numbers in K notation when appropriate
 */
function formatNumberWithK(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  
  if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`;
  }
  
  return num.toString();
}

/**
 * Determines salary bracket for filtering and analytics
 * @param value Either a salary string or SalaryRange object
 * @returns The salary bracket as a string (e.g. "$0-$50K")
 */
export function getSalaryBracket(value: string | SalaryRange | undefined): string {
  let salaryData: SalaryRange | null = null;
  
  if (typeof value === 'string') {
    salaryData = parseSalaryString(value);
  } else if (value && 'min' in value) {
    salaryData = value;
  }
  
  if (!salaryData) return "";
  
  // Average salary for bracketing
  const avgSalary = (salaryData.min + salaryData.max) / 2;
  
  if (avgSalary < 50000) {
    return "$0-$50K";
  } else if (avgSalary < 100000) {
    return "$50K-$100K";
  } else if (avgSalary < 150000) {
    return "$100K-$150K";
  } else {
    return "$150K+";
  }
}