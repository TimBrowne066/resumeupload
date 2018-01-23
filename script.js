let base64;

function convert(){
  let input = document.getElementById("fileinput").files;
  let fileToLoad = input[0];
  let fileReader = new FileReader();
  fileReader.onload = function(fileLoadedEvent) {
    base64 = fileLoadedEvent.target.result;
  }
  fileReader.readAsDataURL(fileToLoad);;
}


function handleSubmit(){
  fetch('https://svc.mobe3app.com/api/submit_resume.js?filename=tbresume.pdf', {
    method: 'POST',
    credentials: 'omit',
    body: base64,
    headers: new Headers({
      "Accept": "application/pdf",
      "Content-Type": "application/pdf",
      "apikey": "7abaa66b2c5e2da3942e35c2fc2d76af",
    }),
  }).then(response => {
    if (response.ok) {
      return response;
      console.log(response);
    } else {
      let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
      throw(error);
    }
  })
  .catch(error => console.error(`Error in fetch: ${error.message}`));
}
