    // Multi-stop itinerary with options
    if (multiStopOptions && Array.isArray(locations) && locations.length > 0) {
      const { numAdults, numKids, timeAvailable, budget, mealPreference, date, preferences } = multiStopOptions;
      
      // Build location summary
      const locationSummary = locations.slice(0, 10).map((loc: any) => {
        return `- ${loc.name} (${loc.category}, ${loc.price}, Best for: ${loc.ageGroups.join(', ')})`;
      }).join('\n');

      // Format date for better prompt
      const visitDate = new Date(date);
      const dateString = visitDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

      const system = "You are an expert DFW family trip planner who creates detailed, personalized itineraries. You have access to real-time weather information and seasonal considerations.";
      const user = `Create 2-3 different day itinerary options for a family visiting the Dallas-Fort Worth area.

**Visit Date:**
${dateString}

**IMPORTANT: Check the weather forecast for this specific date in Dallas-Fort Worth, Texas and plan accordingly:**
- If rain or storms are expected, prioritize indoor activities and covered attractions
- If temperatures are above 90°F, include water activities and indoor AC breaks
- If temperatures are below 50°F, focus on indoor venues and shorter outdoor stops
- Consider seasonal factors (summer heat, winter cold, spring weather)

**Family Details:**
- ${numAdults} adult(s) and ${numKids} kid(s)
- Time available: ${timeAvailable}
- Activity budget: $${budget}
- Meal preference: ${mealPreference}${preferences ? `\n- Special preferences: ${preferences}` : ''}

**Available Locations:**
${locationSummary}

For each itinerary option, use the format:
### Itinerary [Number]: [Catchy Name]

Then provide:
**Morning (9:00 AM - 12:00 PM)**
- Detailed activities and timing
- Weather considerations for this time of day

**Afternoon (12:00 PM - 5:00 PM)**
- Detailed activities and timing
- Weather considerations for this time of day

**Evening (if applicable)**
- Optional activities

Include specific locations from the list above, realistic travel times, and stay within the budget. Make each itinerary unique with a different theme or focus. Consider the weather forecast when ordering activities (e.g., outdoor activities during coolest part of day in summer, indoor activities during rain).`;

      const text = await gen(system, user);
      return { statusCode: 200, body: JSON.stringify({ text }) };
    }