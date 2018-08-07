export function lookupDropDown(lookups) {
  if (lookups) {
    return lookups.map(lookup => {
      return {
        value: lookup.id,
        text: lookup.client + " - " + lookup.country
      };
    });
  }
}
