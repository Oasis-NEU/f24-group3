console.log("Executed Service Worker");
let processedUrls = new Set();

function grab_details(get_url) {
  const URL = get_url.url;

  if (processedUrls.has(URL)) {
    console.log("Already processed this URL:", URL);
    return;
  }
  processedUrls.add(URL);

  fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const classes = data.data.registrations;
      const classesInfo = classes.map((classInfo) => {

        const meetingInfo = classInfo.meetingTimes[0];


        const days = [];
        if (meetingInfo.monday) days.push("Monday");
        if (meetingInfo.tuesday) days.push("Tuesday");
        if (meetingInfo.wednesday) days.push("Wednesday");
        if (meetingInfo.thursday) days.push("Thursday");
        if (meetingInfo.friday) days.push("Friday");


        const formatTime = (time) => {
          if (!time) return "Online";
          const hours = Math.floor(time / 100);
          const minutes = time % 100;
          return `${hours > 12 ? hours - 12 : hours}:${minutes.toString().padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;
        };

        const instructors = classInfo.instructorNames.join(", ");

        return {
          courseInfo: {
            name: classInfo.courseTitle,
            courseNumber: `${classInfo.subject} ${classInfo.courseNumber}`,
            crn: classInfo.courseReferenceNumber,
            instructor: instructors,
            type: classInfo.scheduleDescription,
            instructionalMethod: classInfo.instructionalMethodDescription,
          },
          location: {
            building: meetingInfo.buildingDescription || "Online",
            room: meetingInfo.room || "N/A",
            campus: classInfo.campusDescription,
          },
          schedule: {
            days: days.length > 0 ? days : ["Online"],
            time: {
              start: formatTime(meetingInfo.beginTime),
              end: formatTime(meetingInfo.endTime),
            },
          },
        };
      });
      console.log(classesInfo);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

const filter = {
  urls: [
    "https://nubanner.neu.edu/StudentRegistrationSsb/ssb/registrationHistory/reset*",
  ],
  types: ["xmlhttprequest"],
};

chrome.webRequest.onBeforeRequest.addListener(grab_details, filter);

console.log("webRequest.onBeforeRequest listener registered.");
