export function normalizePostcode(input: string): string {
  // Remove all whitespace and convert to uppercase
  let normalized = input.replace(/\s+/g, '').toUpperCase();
  
  // Check if it matches common postcode formats
  const postcodePatterns = {
    UK: /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/,
    US: /^\d{5}(-\d{4})?$/,
    CA: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z] ?\d[ABCEGHJ-NPRSTV-Z]\d$/,
    AU: /^\d{4}$/
  };

  // Try to detect and format based on country pattern
  for (const [country, pattern] of Object.entries(postcodePatterns)) {
    if (pattern.test(normalized)) {
      switch (country) {
        case 'UK':
          // Format as "AA9A 9AA"
          return normalized.replace(/^(.+?)(\d[A-Z]{2})$/, '$1 $2');
        case 'US':
          // Format as "12345" or "12345-6789"
          return normalized.replace(/^(\d{5})(\d{4})?$/, '$1$2');
        case 'CA':
          // Format as "A9A 9A9"
          return normalized.replace(/^(.{3})(.{3})$/, '$1 $2');
        case 'AU':
          // Keep as is (4 digits)
          return normalized;
      }
    }
  }

  // If no specific format matches, return the normalized input
  return normalized;
}