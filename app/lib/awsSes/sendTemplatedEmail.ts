const { SendTemplatedEmailCommand } = require("@aws-sdk/client-ses");
const awsClient = require("./awsSesConfig.ts");

const sendTemplatedEmail = (finalEmailJson) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sendTemplatedEmailCommand = createSendEmailTemplateCommand(
        "fallback15",
        finalEmailJson
      );
      const awsResponse = await awsClient.send(sendTemplatedEmailCommand);
      console.log(`templated email sent for user ${finalEmailJson.userEmail} `);
      resolve(awsResponse);
    } catch (err) {
      console.error(
        `Failed to send template email for user ${finalEmailJson.userEmail}`,
        err
      );
      reject(err) //The loop continues even if an error occurs! (eg email is not verified)
    }
  });
};

const mockdata = {
  userEmail: "testuser@gmail.com",
  podcasts: [
    {
      name: "random name",
      podcast_created_at: "2023-09-10T20:34:18.622706+00:00",
    },
    {
      name: "A portrait of the best worst programmer",
      podcast_created_at: "random date",
    },
    {
      name: "Doomed to discuss AI",
      podcast_created_at: "2023-09-12T11:44:03.837919+00:00",
    },
  ],
};

const createSendEmailTemplateCommand = (templateName, finalEmailJson) => {
  //INTENTIONAL ERROR TEST: Delete or Comment out for production
  // if (finalEmailJson.userEmail === "jimmymcgill@gmail.com") {
  //   return new SendTemplatedEmailCommand({
  //     Destination: { ToAddresses: ["nonExisting@gmail.com"] },
  //     TemplateData: JSON.stringify(finalEmailJson),
  //     Source: "nguyen.anh.minh.stud@gmail.com",
  //     Template: templateName,
  //   });
  // }

  return new SendTemplatedEmailCommand({
    Destination: { ToAddresses: ["n.a.minh1106@gmail.com"] },
    TemplateData: JSON.stringify(finalEmailJson),
    Source: "nguyen.anh.minh.stud@gmail.com",
    Template: templateName,
  });
};

const send = async () => {
  await sendTemplatedEmail(mockdata);
};

// send();

module.exports = sendTemplatedEmail;
