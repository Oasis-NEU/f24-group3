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
