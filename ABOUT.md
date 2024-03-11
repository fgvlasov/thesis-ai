# Student Service Idea for Application Frameworks Course

## Overview

This service aims to assist students in finding relevant companies for their diploma thesis based on their specialty, interests, and main ideas. By leveraging a backend database and AI, students can easily connect with Finnish companies that match their future career aspirations and academic interests.

## How It Works

1. **Student Profile Submission**:

   - Students log into the platform and submit their information, including their specialty, interests, and a brief description of their main idea for the diploma thesis.

2. **Database of Finnish Companies**:

   - The backend is powered by MongoDB, where a comprehensive list of Finnish companies, along with their descriptions and future interests, is stored.

3. **Matching Process**:

   - Using the OpenAI API, the system analyzes the student's submitted information and searches the database for companies that align with the student's field and interests.

4. **Thesis Generation**:
   - Once potential companies are identified, the OpenAI API generates three thesis ideas tailored to the student's profile and the selected companies' focus areas.

## Benefits

- **Personalization**: Students receive tailored thesis suggestions that align with their academic and career interests.
- **Industry Relevance**: Connects students with real-world companies, providing practical experience and potential job opportunities.
- **Efficiency**: Streamlines the process of finding a suitable company and thesis idea, saving time and resources.

## Implementation

- The service will be developed as part of the Application Frameworks course, using modern development practices and frameworks.
- MongoDB will serve as the backend database, storing company profiles and student information securely.
- The OpenAI API will be integrated to leverage advanced AI capabilities for matching students with companies and generating thesis ideas.

## Next Features

- Expansion to include companies from other countries and regions.
- Integration with educational institutions for direct submission and approval of thesis topics.
- Enhanced AI capabilities for more sophisticated matching and thesis generation.

### Thesis Verification

- **Comparison with Existing Theses**:
  - After generating three thesis ideas, the system will automatically check them against a database of real theses hosted on [Theseus.fi](https://www.theseus.fi/).
  - Utilizes Theseus.fi's advanced search and filter capabilities to ensure that the suggested theses are unique and not duplicative of existing work.

### Thesis Description and Presentation

- **Dynamic Thesis Descriptions**:
  - For each of the proposed thesis ideas, the system will generate a detailed description outlining the objectives, potential impact, and relevance to the student's field.
- **QR Code Generation**:
  - A QR code will be generated for each thesis idea. This code links to a detailed page where the student can view the full description, objectives, and potential resources.
  - These QR codes can be used in presentations or printed on posters for easy access to thesis information.

### Literature Search

- **Automated Literature Search**:
  - The system will perform an automated search for related literature on [Theseus.fi](https://www.theseus.fi/) based on the student's thesis topic and related keywords.
  - This feature helps students to easily find and review similar works, providing a solid foundation for their research and ensuring they are building on existing knowledge.

## Integration Process

- The features will be integrated into the existing student service platform, enhancing the user experience and providing more value.
- They will utilize APIs from Theseus.fi for accessing the database of theses and literature, ensuring up-to-date and relevant results.

## User Experience

- Students will have a seamless experience from idea generation to literature review, all within a single platform.
- The addition of QR codes and automatic literature searches significantly streamlines the research process, making it easier for students to focus on their thesis content.

## Conclusion

- These new features will make the student service an indispensable tool for thesis preparation, offering unique insights and resources that are tailored to each student's needs.
