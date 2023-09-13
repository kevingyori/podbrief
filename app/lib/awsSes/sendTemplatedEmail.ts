const { SendTemplatedEmailCommand } = require("@aws-sdk/client-ses");
const awsClient = require("./awsSesConfig.ts")
  
const sendTemplatedEmail = (finalEmailJson) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sendTemplatedEmailCommand = createSendEmailTemplateCommand("fallback5", finalEmailJson);
      const result = await awsClient.send(sendTemplatedEmailCommand);
      console.log(`templated email sent for user ${finalEmailJson.username} `);
      resolve(result);
    } catch (err) {
      console.log(`Failed to send template email for user ${finalEmailJson.username}`, err);
      reject(err);
    }
  });
};

const mockdata =  {
  username: "testuser" || "Podcaster",
  podcastSummaries: [{
        name: undefined,
        podcast_created_at: '2023-09-10T20:34:18.622706+00:00'
      },{
        name: 'A portrait of the best worst programmer',
        podcast_created_at: null
      },{
        name: 'Doomed to discuss AI',
        podcast_created_at: '2023-09-12T11:44:03.837919+00:00'
      }
    ]
}


const createSendEmailTemplateCommand = (templateName, finalEmailJson) => {

  return new SendTemplatedEmailCommand({

      Destination: { ToAddresses: ["n.a.minh1106@gmail.com"] },
      TemplateData: JSON.stringify(finalEmailJson),
      Source: "nguyen.anh.minh.stud@gmail.com",
      Template: templateName,
    });
  };

  const send = async () => {
    await sendTemplatedEmail(mockdata)
  }

  send()

  module.exports = sendTemplatedEmail