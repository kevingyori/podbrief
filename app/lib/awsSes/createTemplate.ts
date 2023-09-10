const {CreateTemplateCommand } = require("@aws-sdk/client-ses")
const aws_ses_client = require("./awsSesConfig.ts")

async function createSESTemplate() {

  const templateObject = {
    Template: {
      TemplateName: "TestTemplate",
      SubjectPart: "Greetings, {{name}}!",
      HtmlPart: `
        <h1>Hello {{name}},</h1>
        <p>
            Your favorite animal is {{favoriteanimal}}.
        </p>
        `,
      TextPart: "Dear {{name}},\r\nYour favorite animal is {{favoriteanimal}}."
    }
  }  

  const command = new CreateTemplateCommand(templateObject);

  try {
    const response = await  aws_ses_client.send(command);
    return response;
  } catch (error) {
    console.error("Error creating SES template:", error);
    throw error;
  }
}


  async function runCreateTemplate() {
    try {
      const response = await createSESTemplate();
      console.log("Template created:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  runCreateTemplate();
  
