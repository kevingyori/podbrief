const { CreateTemplateCommand } = require("@aws-sdk/client-ses");
const aws_ses_client = require("./awsSesConfig.ts");

async function createSESTemplate() {
  const templateObject = {
    Template: {
      TemplateName: "fallback4",
      SubjectPart: "Greetings {{#if userName}}{{userName}}{{else}}Podcaster{{/if}}!",
      HtmlPart: `
      {{#each podcasts}}
      <p>
        <strong>Name:</strong> {{#if name}}{{name}}{{else}}No Name Provided{{/if}},
        <strong>Date:</strong> {{#if podcast_created_at}}{{podcast_created_at}}{{else}}No Date Provided{{/if}}
      </p>
    {{/each}}
        `,
      TextPart: "",
    },
  };

  const command = new CreateTemplateCommand(templateObject);

  try {
    const response = await aws_ses_client.send(command);
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
