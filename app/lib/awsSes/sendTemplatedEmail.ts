const { SendTemplatedEmailCommand } = require("@aws-sdk/client-ses");
const awsClient = require("./awsSesConfig.ts")

const createSendEmailTemplateCommand = (templateName: string) => {
    return new SendTemplatedEmailCommand({
      /**
       * Here's an example of how a template would be replaced with user data:
       * Template: <h1>Hello {{contact.firstName}},</h1><p>Don't forget about the party gifts!</p>
       */
      Destination: { ToAddresses: ["n.a.minh1106@gmail.com"] },
    //   TemplateData: JSON.stringify({ contact: { firstName: user.firstName } }),
      TemplateData: JSON.stringify({name: "Minh", favoriteanimal: "penguins"}),
      Source: "n.a.minh1106@gmail.com,",
      Template: templateName,
    });
  };
  
  const sendTemplatedEmail = async () => {
    const sendTemplatedEmailCommand = createSendEmailTemplateCommand(
    //   user,
      "TestTemplate"
    );
    try {
      console.log("templated email sent")
      return await awsClient.send(sendTemplatedEmailCommand);
    } catch (err) {
      console.log("Failed to send template email", err);
      return err;
    }
  };

  sendTemplatedEmail()