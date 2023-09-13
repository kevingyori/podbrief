const { SendTemplatedEmailCommand } = require("@aws-sdk/client-ses");
const awsClient = require("./awsSesConfig.ts")
  
const sendTemplatedEmail = (userName, podcastSummaries) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sendTemplatedEmailCommand = createSendEmailTemplateCommand("fallback4", userName, podcastSummaries);
      const result = await awsClient.send(sendTemplatedEmailCommand);
      console.log(`templated email sent for user ${userName}`);
      resolve(result);
    } catch (err) {
      console.log("Failed to send template email", err);
      reject(err);
    }
  });
};

const mockdata = [{
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


const createSendEmailTemplateCommand = (templateName, userName, podcastSummaries) => {
    return new SendTemplatedEmailCommand({

      Destination: { ToAddresses: ["n.a.minh1106@gmail.com"] },
      TemplateData: JSON.stringify({
        userName: userName || "Podcaster",
        podcasts: podcastSummaries
      }),
      Source: "nguyen.anh.minh.stud@gmail.com",
      Template: templateName,
    });
  };

  const send = async () => {
    await sendTemplatedEmail(undefined, mockdata )
  }

  send()

  module.exports = sendTemplatedEmail