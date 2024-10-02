# Project Send Phrases

## Summary

- [Introduction](#introduction)
- [How to Use](#how-to-use)
- [How to Download](#how-to-download)
- [Resources Used](#resources-used)
- [License](#license)

## Introduction

Project Send Phrases is a tool developed to automate the sending of motivational phrases from various types of different authors, automatically generated through a specific API for generating phrases and another API for sending these phrases via email. The APIs used are detailed below:

- **Sentence Generation API**: [Link to API](https://zenquotes.io/)
- **Email Sending API**: [Link to API](https://www.mailjet.com/)

Recipients can be added manually in the project's `.env` file by setting them as environment variables. It is important to follow the example provided in the `.env.example` file to ensure correct credential configuration.

I used GitHub Actions (workflows) to schedule the execution of the repository with the code every day at 8 am, sending the sentences to the recipients previously defined in the `.env` file.

## How to Use

To use Project Send Phrases, follow the steps below:

1. **Installation**: Clone the project repository or download the source code available on GitHub.
2. **Configuration**: Configure your API access credentials, following the example provided in the `.env.example` file and saving it as `.env` in the project root directory.
4. **Dependency Installation**: Install the project dependencies with the command: `npm install`
5. **Project execution**: Access the terminal at the root of the cloned project and type the command: `node index.js`. Wait while the project runs and success messages are displayed.

## How to Download

To obtain the ProjectSendFrases source code, follow these steps:

1. Navigate to the project page on GitHub.
2. Click the "Code" button.
3. Choose whether to clone the repository using HTTPS or SSH, depending on your preferred connection method.
4. Follow the instructions provided by your Git client to clone the repository to your local computer.

## Resources Used

ProjectSendFrases was developed using the following technologies and libraries:

- **Node.js**: JavaScript execution platform for building server applications.
- **Axios**: Library to make HTTP requests asynchronously.
- **dotenv**: Package for loading environment variables from a `.env` file.

## License

This project is licensed under the MIT License. See the `LICENSE` file in the repository for more details.

---