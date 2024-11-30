function convertToLocalTime(text) {
    const timeRegex = /(\d{1,2})(?::|\.)?(\d{2})?\s*(AM|PM)?\s*(\b[A-Z]{2,4}\b)/i;
    const match = text.match(timeRegex);

    if (!match) {
        return text;
    }

    let localTimeString = getLocalTime(match);
    if (!localTimeString) {
        return text;
    }

    const newText = text.replace(timeRegex, localTimeString);
    return newText;
}

function getLocalTime(match) {
    const hour = parseInt(match[1], 10);
    const minute = match[2] ? parseInt(match[2], 10) : 0;
    const period = match[3] ? match[3].toUpperCase() : null;
    const timezoneAbbreviation = match[4];

    const timezoneMap = {
        // Europe Timezones
        'CET': 'Europe/Berlin',    // Central European Time
        'CEST': 'Europe/Berlin',   // Central European Summer Time
        'EET': 'Europe/Helsinki',   // Eastern European Time
        'EEST': 'Europe/Helsinki',  // Eastern European Summer Time
        'GMT': 'Europe/London',     // Greenwich Mean Time
        'BST': 'Europe/London',     // British Summer Time
        'WET': 'Europe/Lisbon',     // Western European Time
        'WEST': 'Europe/Lisbon',    // Western European Summer Time
        'MSK': 'Europe/Moscow',     // Moscow Standard Time
        'MSD': 'Europe/Moscow',     // Moscow Daylight Time
        'CST': 'Europe/Bucharest',  // Central Standard Time (often mistaken, be careful)
        'EEST': 'Europe/Sofia',     // Eastern European Summer Time
        'IST': 'Europe/Dublin',      // Irish Standard Time
        'MET': 'Europe/Paris',      // Middle European Time
        'MEST': 'Europe/Paris',     // Middle European Summer Time
        'UTC': 'Etc/UTC',           // Coordinated Universal Time

        // US Timezones
        'EST': 'America/New_York',  // Eastern Standard Time
        'EDT': 'America/New_York',  // Eastern Daylight Time
        'CST': 'America/Chicago',    // Central Standard Time
        'CDT': 'America/Chicago',    // Central Daylight Time
        'MST': 'America/Denver',     // Mountain Standard Time
        'MDT': 'America/Denver',     // Mountain Daylight Time
        'PST': 'America/Los_Angeles', // Pacific Standard Time
        'PDT': 'America/Los_Angeles', // Pacific Daylight Time
        'AKST': 'America/Anchorage', // Alaska Standard Time
        'AKDT': 'America/Anchorage', // Alaska Daylight Time
        'HST': 'Pacific/Honolulu',   // Hawaii-Aleutian Standard Time
        'SST': 'Pacific/Guam',       // Samoa Standard Time
        'AST': 'America/Puerto_Rico', // Atlantic Standard Time
        'ADT': 'America/Puerto_Rico', // Atlantic Daylight Time
    };

    const timezone = timezoneMap[timezoneAbbreviation] || 'UTC';

    let hours24 = hour;
    if (period) {
        if (period === 'PM' && hour !== 12) {
            hours24 += 12;
        } else if (period === 'AM' && hour === 12) {
            hours24 = 0;
        }
    }

    const utcDate = new Date(Date.UTC(1970, 0, 1, hours24, minute));

    const options = {
        timeZone: timezone,
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const localTimeString = new Intl.DateTimeFormat('en-US', options).format(utcDate);
    return localTimeString;
}