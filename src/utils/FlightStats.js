export const calculatePickupTime = (actualFlightTime) => {
  const flightTimeDiff = new Date(actualFlightTime).getTime();

  // According to business logic Flight must be created 5 hour ahead.
  // Which means at least 6 hour must required to create a booking.
  // let currentSystemTime = new Date().getTime() + (3600000 * 6);

  // Pickup Time would be between an hour after booking creating TO 4 hour before flight departure
  // So, Adding 1 hour in current time and Subtracting 4 hour in departure time.
  let maxPick = new Date(flightTimeDiff).getTime() - (3600000 * 5);
  const minPick = new Date().getTime() + (3600000 * 1);

  /**
     * Enable this code if picukup time showing only 50 min or less than 1 hour
     * but If it is enabled than the flight whose time remain is exactly 5 min
     * will show only 1 slot
     *  var minPick = new Date().getTime() + (3600000 * 1) + (60000 * 10)
     */

  const luggagePickUpWindow = [];
  luggagePickUpWindow.push(new Date(maxPick).toString());


  // This will populate Pickup time in drop-down menu
  // Math.round is applied to make 15 hours fixed e.g 15,30,45,60.
  while (maxPick > minPick) {
    const coeff = 1000 * 60 * 5;
    const a = new Date(new Date(Math.round(maxPick / coeff) * coeff).getTime() - (900000));
    maxPick = new Date(maxPick).getTime() - (900000);
    luggagePickUpWindow.push(a.toString());
  }


  // Here filteredPickUpWindow calculation perfomed to make sure customer only chose 18 hour before the dept time
  // This block handle Future bookings. When ever flight is booked for, Customer have only to select between min 4 to max18 hours before his flight time
  let filteredPickUpWindow;
  if (luggagePickUpWindow.length > 71) {
    filteredPickUpWindow = luggagePickUpWindow.slice(0, 71);
  } else {
    filteredPickUpWindow = luggagePickUpWindow;
  }

  return filteredPickUpWindow;
};

export const calculateDropoffTime = (actualFlightTime) => {
  // This block caluclatin dropOff time
  // Subtract 2 hour in flight because customer has to collect it 2 hour before departing
  const flightTime = new Date(actualFlightTime).getTime();
  let maxDropOff = new Date(flightTime).getTime() - (3600000 * 2);
  const luggageDropOff = [];

  for (let i = 0; i < 6; i += 1) {
    const coeff = 1000 * 60 * 5;
    const a = new Date(new Date(Math.round(maxDropOff / coeff) * coeff).getTime() - (900000));
    maxDropOff = new Date(maxDropOff).getTime() - (900000);
    luggageDropOff.push(a.toString());
  }

  return luggageDropOff;
};
